from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Pipeline, PipelineRun
from datetime import datetime
import csv
from sqlalchemy import text

router = APIRouter()


@router.post("/pipelines/create")
def create_pipeline(payload: dict, db: Session = Depends(get_db)):
    pipeline = Pipeline(
        name=payload["name"],
        source=payload["source"],
        destination=payload["destination"],
        file_path=payload.get("file_path")
    )
    db.add(pipeline)
    db.commit()
    return {"message": "Pipeline created"}


@router.get("/pipelines")
def get_pipelines(db: Session = Depends(get_db)):
    return db.query(Pipeline).all()


@router.post("/pipelines/run/{pipeline_id}")
def run_pipeline(pipeline_id: int, db: Session = Depends(get_db)):

    pipeline = db.query(Pipeline).filter(Pipeline.id == pipeline_id).first()

    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    logs = []
    start_time = datetime.utcnow()

    pipeline.status = "running"
    pipeline.logs = ""
    pipeline.error = None
    db.commit()

    try:
        logs.append("🚀 Pipeline started")

        if pipeline.source == "csv":
            with open(pipeline.file_path, "r") as f:
                reader = csv.DictReader(f)
                columns = reader.fieldnames

                col_defs = ", ".join([f"{col} TEXT" for col in columns])

                db.execute(text(f"DROP TABLE IF EXISTS {pipeline.destination}"))
                db.execute(text(f"CREATE TABLE {pipeline.destination} ({col_defs});"))

                for row in reader:
                    values = ", ".join([f":{col}" for col in columns])
                    db.execute(
                        text(f"INSERT INTO {pipeline.destination} VALUES ({values})"),
                        row
                    )

                db.commit()

        pipeline.status = "success"
        pipeline.last_run = datetime.utcnow()
        pipeline.logs = "\n".join(logs)

        run = PipelineRun(
            pipeline_id=pipeline.id,
            status="success",
            started_at=start_time,
            finished_at=datetime.utcnow(),
            logs=pipeline.logs
        )

        db.add(run)
        db.commit()

        return {"message": "Pipeline executed successfully"}

    except Exception as e:
        pipeline.status = "failed"
        pipeline.error = str(e)
        pipeline.logs = "\n".join(logs)

        run = PipelineRun(
            pipeline_id=pipeline.id,
            status="failed",
            started_at=start_time,
            finished_at=datetime.utcnow(),
            logs=pipeline.logs
        )

        db.add(run)
        db.commit()

        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pipelines/{pipeline_id}/logs")
def get_pipeline_logs(pipeline_id: int, db: Session = Depends(get_db)):

    run = (
        db.query(PipelineRun)
        .filter(PipelineRun.pipeline_id == pipeline_id)
        .order_by(PipelineRun.started_at.desc())
        .first()
    )

    if not run:
        return {"logs": "No runs yet"}

    return {
        "status": run.status,
        "started_at": run.started_at,
        "finished_at": run.finished_at,
        "logs": run.logs
    }


@router.get("/pipeline-runs/{run_id}/logs")
def get_run_logs(run_id: int, db: Session = Depends(get_db)):

    run = db.query(PipelineRun).filter(PipelineRun.id == run_id).first()

    if not run:
        raise HTTPException(status_code=404, detail="Run not found")

    return {
        "status": run.status,
        "started_at": run.started_at,
        "finished_at": run.finished_at,
        "logs": run.logs
    }


@router.get("/pipelines/{pipeline_id}/runs")
def get_pipeline_runs(pipeline_id: int, db: Session = Depends(get_db)):

    runs = (
        db.query(PipelineRun)
        .filter(PipelineRun.pipeline_id == pipeline_id)
        .order_by(PipelineRun.started_at.desc())
        .all()
    )

    return runs