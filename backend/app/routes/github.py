from fastapi import APIRouter
from app.crud.github import get_github_contributions
from app.schemas import GithubContributionResponse

router = APIRouter(
    prefix="/github",
    tags=["GitHub"]
)


@router.get(
    "/contributions",
    response_model=GithubContributionResponse
)
async def github_contributions():

    return await get_github_contributions()