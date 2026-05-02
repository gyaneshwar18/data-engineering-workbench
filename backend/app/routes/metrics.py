from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text, func
from app.database import get_db
from app.models import QueryHistory

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"]
)

# KPI metrics for dashboard cards
@router.get("/query-stats")
def query_stats(db: Session = Depends(get_db)):

    total_queries = db.execute(text("""
        SELECT COUNT(*) FROM query_history
    """)).scalar()

    successful_queries = db.execute(text("""
        SELECT COUNT(*) FROM query_history
        WHERE status='success'
    """)).scalar()

    avg_execution_time = db.execute(text("""
        SELECT AVG(execution_time) FROM query_history
    """)).scalar()

    last_query = db.execute(text("""
        SELECT query FROM query_history
        ORDER BY created_at DESC
        LIMIT 1
    """)).scalar()

    return {
        "total_queries": total_queries,
        "successful_queries": successful_queries,
        "avg_execution_time": avg_execution_time,
        "last_query": last_query
    }


# analytics metrics for charts
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
        COUNT(*) * 100
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


@router.get("/analytics/top-slow-queries")
def top_slow_queries(db: Session = Depends(get_db)):

    results = (
        db.query(
            QueryHistory.query,
            func.avg(QueryHistory.execution_time).label("avg_time"),
            func.count(QueryHistory.id).label("count")
        )
        .group_by(QueryHistory.query)
        .order_by(func.avg(QueryHistory.execution_time).desc())
        .limit(10)
        .all()
    )

    return [
        {
            "query": r.query,
            "avg_time": round(r.avg_time, 2),
            "count": r.count
        }
        for r in results
    ]

# 🔥 MOST USED QUERIES
@router.get("/analytics/most-used-queries")
def most_used_queries(db: Session = Depends(get_db)):

    results = (
        db.query(
            QueryHistory.query,
            func.count(QueryHistory.id).label("count")
        )
        .group_by(QueryHistory.query)
        .order_by(func.count(QueryHistory.id).desc())
        .limit(10)
        .all()
    )

    return [
        {
            "query": r.query,
            "count": r.count
        }
        for r in results
    ]

# 🔥 QUERY EXECUTION TREND
@router.get("/analytics/query-execution-trend")
def query_execution_trend(db: Session = Depends(get_db)):

    results = db.execute(text("""
        SELECT
            DATE(created_at) as date,
            COUNT(*) as total
        FROM query_history
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    """)).fetchall()

    return [
        dict(row._mapping)
        for row in results
    ]