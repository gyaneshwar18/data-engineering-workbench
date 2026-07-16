from pydantic import BaseModel


class DashboardStatsBase(BaseModel):
    sql_queries: int
    datasets: int
    pipelines: int
    api_sources: int


class DashboardStatsResponse(DashboardStatsBase):
    id: int

    class Config:
        orm_mode = True


# ---------------- GitHub ----------------

class ContributionDay(BaseModel):
    date: str
    contribution_count: int
    contribution_level: str


class ContributionWeek(BaseModel):
    contribution_days: list[ContributionDay]


class ContributionInsights(BaseModel):
    active_weeks: int
    longest_streak: int
    last_commit: str


class GithubContributionResponse(BaseModel):
    total_contributions: int
    weeks: list[ContributionWeek]
    insights: ContributionInsights