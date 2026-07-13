import os
import httpx

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

    headers = {
        "Authorization": f"Bearer {token}"
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
        raise Exception(
        f"GitHub API Error ({response.status_code}): {response.text}"
        )

    data = response.json()

    if "errors" in data:
        raise Exception(
            f"GitHub GraphQL Error: {data['errors']}"
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