import os
import httpx
from fastapi import HTTPException

GITHUB_API = "https://api.github.com/graphql"

QUERY = """
query($username:String!){
  user(login:$username){
    contributionsCollection{
      contributionCalendar{
        totalContributions

        weeks{

          contributionDays{

            contributionCount
            contributionLevel
            date

          }

        }

      }

    }

  }

}
"""


async def get_github_contributions():

    username = os.getenv("GITHUB_USERNAME")
    token = os.getenv("GITHUB_TOKEN")

# DEBUG
   

    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
    }

    payload = {
        "query": QUERY,
        "variables": {
            "username": username
        }
    }

    async with httpx.AsyncClient(timeout=30) as client:

        response = await client.post(
            GITHUB_API,
            headers=headers,
            json=payload
        )
       

    if response.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="Unable to fetch GitHub contribution data."
        )

    data = response.json()

    if "errors" in data:
        raise HTTPException(
            status_code=502,
            detail="GitHub GraphQL returned an error."
        )
    calendar = (
        data["data"]
        ["user"]
        ["contributionsCollection"]
        ["contributionCalendar"]
    )

    weeks = []

    for week in calendar["weeks"]:

        contribution_days = []

        for day in week["contributionDays"]:

            contribution_days.append({
                "date": day["date"],
                "contribution_count": day["contributionCount"],
                "contribution_level": day["contributionLevel"]
            })

        weeks.append({
            "contribution_days": contribution_days
        })

    return {
        "total_contributions": calendar["totalContributions"],
        "weeks": weeks
    }