from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db

router = APIRouter()

@router.get("/metrics/query-stats")
def query_metrics(db: Session = Depends(get_db)):

    total = db.execute(text(
        "SELECT COUNT(*) FROM query_history"
    )).scalar()

    success = db.execute(text(
        "SELECT COUNT(*) FROM query_history WHERE status='success'"
    )).scalar()

    avg_time = db.execute(text(
        "SELECT AVG(execution_time) FROM query_history"
    )).scalar()

    last_query = db.execute(text(
        "SELECT query FROM query_history ORDER BY created_at DESC LIMIT 1"
    )).scalar()

    return {
        "total_queries": total,
        "successful_queries": success,
        "avg_execution_time": avg_time,
        "last_query": last_query
    }