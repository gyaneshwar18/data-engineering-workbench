from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter()

@router.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):

    stats = db.query(models.DashboardStats).first()

    if not stats:
        stats = models.DashboardStats(
            sql_queries=142,
            datasets=12,
            pipelines=5,
            api_sources=3
        )
        db.add(stats)
        db.commit()
        db.refresh(stats)

    return stats