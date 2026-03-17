from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"]
)

@router.get("/query-performance")
def query_performance(db: Session = Depends(get_db)):

    queries_per_day = db.execute(text("""
        SELECT DATE(created_at) as date, COUNT(*) as total
        FROM query_history
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    """)).fetchall()

    success_rate = db.execute(text("""
        SELECT
        SUM(CASE WHEN status='success' THEN 1 ELSE 0 END)::float /
        COUNT(*) * 100 as success_rate
        FROM query_history
    """)).scalar()

    execution_trend = db.execute(text("""
        SELECT DATE(created_at) as date,
        AVG(execution_time) as avg_time
        FROM query_history
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    """)).fetchall()

    return {
        "queries_per_day": [dict(row._mapping) for row in queries_per_day],
        "success_rate": success_rate,
        "execution_trend": [dict(row._mapping) for row in execution_trend]
    }