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