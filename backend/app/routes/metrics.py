from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import QueryHistory

router = APIRouter()


@router.get("/metrics/query-stats")
def get_query_metrics(db: Session = Depends(get_db)):

    total_queries = db.query(func.count(QueryHistory.id)).scalar()

    successful_queries = db.query(func.count(QueryHistory.id))\
        .filter(QueryHistory.status == "success")\
        .scalar()

    avg_execution_time = db.query(func.avg(QueryHistory.execution_time)).scalar()

    last_query = db.query(QueryHistory.query)\
        .order_by(QueryHistory.created_at.desc())\
        .first()

    return {
        "total_queries": total_queries,
        "successful_queries": successful_queries,
        "avg_execution_time": avg_execution_time,
        "last_query": last_query[0] if last_query else None
    }