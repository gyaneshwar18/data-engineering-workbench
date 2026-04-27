from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Pipeline, PipelineRun
from datetime import datetime
import csv
from sqlalchemy import text
import os

router = APIRouter()


# 🔹 CREATE PIPELINE
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


# 🔹 GET PIPELINES
@router.get("/pipelines")
def get_pipelines(db: Session = Depends(get_db)):
    return db.query(Pipeline).all()


# 🔹 RUN PIPELINE (WITH FULL DEBUG LOGGING)
@router.post("/pipelines/run/{pipeline_id}")
def run_pipeline(pipeline_id: int, db: Session = Depends(get_db)):

    pipeline = db.query(Pipeline).filter(Pipeline.id == pipeline_id).first()

    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    logs = []
    start_time = datetime.utcnow()

    # mark running
    pipeline.status = "running"
    pipeline.logs = ""
    pipeline.error = None
    db.commit()

    try:
        logs.append("🚀 Pipeline started")
        logs.append(f"📂 Input path: {pipeline.file_path}")

        if pipeline.source == "csv":

            if not pipeline.file_path:
                raise Exception("CSV file path missing")

            # 🔥 SAFE PATH RESOLUTION
            base_dir = os.getcwd()   # backend folder
            file_path = os.path.join(base_dir, pipeline.file_path)

            logs.append(f"📂 Resolved path: {file_path}")

            # 🔥 CHECK FILE EXISTS
            if not os.path.exists(file_path):
                raise Exception(f"File not found at {file_path}")

            with open(file_path, "r") as f:
                reader = csv.DictReader(f)

                if not reader.fieldnames:
                    raise Exception("CSV has no headers")

                columns = reader.fieldnames
                logs.append(f"📊 Columns: {columns}")

                # 🔥 CLEAN COLUMN NAMES (avoid SQL issues)
                safe_columns = [col.strip().replace(" ", "_") for col in columns]

                col_defs = ", ".join([f"{col} TEXT" for col in safe_columns])

                logs.append("🧹 Dropping old table")
                db.execute(text(f"DROP TABLE IF EXISTS {pipeline.destination}"))

                logs.append("🏗 Creating table")
                db.execute(text(f"CREATE TABLE {pipeline.destination} ({col_defs});"))

                count = 0

                for row in reader:
                    # map cleaned column names
                    clean_row = {
                        col.strip().replace(" ", "_"): value
                        for col, value in row.items()
                    }

                    values = ", ".join([f":{col}" for col in safe_columns])

                    db.execute(
                        text(f"INSERT INTO {pipeline.destination} VALUES ({values})"),
                        clean_row
                    )
                    count += 1

                logs.append(f"✅ Inserted {count} rows")
                db.commit()

        # SUCCESS
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
        logs.append(f"❌ Error: {str(e)}")

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

# 🔹 GET RUN HISTORY
@router.get("/pipelines/{pipeline_id}/runs")
def get_pipeline_runs(pipeline_id: int, db: Session = Depends(get_db)):
    return (
        db.query(PipelineRun)
        .filter(PipelineRun.pipeline_id == pipeline_id)
        .order_by(PipelineRun.started_at.desc())
        .all()
    )


# 🔹 GET SPECIFIC RUN LOGS
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

@router.get("/pipelines/{pipeline_id}/logs")
def get_pipeline_logs(pipeline_id: int, db: Session = Depends(get_db)):

    run = (
        db.query(PipelineRun)
        .filter(PipelineRun.pipeline_id == pipeline_id)
        .order_by(PipelineRun.started_at.desc())
        .first()
    )

    if not run:
        return {
            "status": "no_runs",
            "logs": "No pipeline runs yet"
        }

    return {
        "status": run.status,
        "started_at": run.started_at,
        "finished_at": run.finished_at,
        "logs": run.logs or "No logs"
    }