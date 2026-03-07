from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard/stats")
def dashboard_stats():
    return {
        "sql_queries": 142,
        "datasets": 12,
        "pipelines": 5,
        "api_sources": 3
    }