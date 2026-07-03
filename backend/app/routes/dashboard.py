from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.models import Pipeline, PipelineRun

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

@router.get("/dashboard/recent-activity")
def get_recent_activity(
    db: Session = Depends(get_db)
):
    runs = (
        db.query(
            PipelineRun,
            Pipeline.name
        )
        .join(
            Pipeline,
            PipelineRun.pipeline_id == Pipeline.id
        )
        .order_by(
            PipelineRun.started_at.desc()
        )
        .limit(5)
        .all()
    )

    activity = []

    for run, pipeline_name in runs:
        duration = None

        if run.started_at and run.finished_at:
            duration = (
                run.finished_at - run.started_at
            ).total_seconds()

        activity.append(
            {
                "id": run.id,
                "pipeline_name": pipeline_name,
                "status": run.status,
                "started_at": run.started_at,
                "finished_at": run.finished_at,
                "duration_seconds": duration,
            }
        )

    return activity