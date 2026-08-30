from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, text

from app.database import get_db
from app.models import QueryHistory, Pipeline, PipelineRun


router = APIRouter()


# ============================================================
# DASHBOARD STATS
# ============================================================

@router.get("/dashboard/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
):
    # --------------------------------------------------------
    # SQL Queries
    # --------------------------------------------------------

    sql_queries = (
        db.query(func.count(QueryHistory.id))
        .scalar()
        or 0
    )

    # --------------------------------------------------------
    # Datasets
    # --------------------------------------------------------
    #
    # Count actual tables in the public PostgreSQL schema.
    #
    datasets = db.execute(
        text("""
            SELECT COUNT(*)
            FROM information_schema.tables
            WHERE table_schema = 'public'
        """)
    ).scalar() or 0

    # --------------------------------------------------------
    # Pipelines
    # --------------------------------------------------------

    pipelines = (
        db.query(func.count(Pipeline.id))
        .scalar()
        or 0
    )

    # --------------------------------------------------------
    # API Sources
    # --------------------------------------------------------

    api_sources = (
        db.query(func.count(Pipeline.id))
        .filter(Pipeline.source == "api")
        .scalar()
        or 0
    )

    return {
        "sql_queries": sql_queries,
        "datasets": datasets,
        "pipelines": pipelines,
        "api_sources": api_sources,
    }


# ============================================================
# RECENT ACTIVITY
# ============================================================

@router.get("/dashboard/recent-activity")
def get_recent_activity(
    db: Session = Depends(get_db),
):
    runs = (
        db.query(
            PipelineRun,
            Pipeline.name,
        )
        .join(
            Pipeline,
            PipelineRun.pipeline_id == Pipeline.id,
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