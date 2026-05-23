from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Pipeline, PipelineRun
from datetime import datetime, timedelta
import csv
from sqlalchemy import text
import os
import requests



router = APIRouter()

def execute_pipeline(
    pipeline: Pipeline,
    db: Session
):
    pass

def should_run_pipeline(pipeline):

    if not pipeline.last_scheduled_run:
        return True

    now = datetime.utcnow()

    if pipeline.schedule_type == "hourly":
        return now - pipeline.last_scheduled_run >= timedelta(hours=1)

    elif pipeline.schedule_type == "daily":
        return now - pipeline.last_scheduled_run >= timedelta(days=1)

    elif pipeline.schedule_type == "weekly":
        return now - pipeline.last_scheduled_run >= timedelta(days=7)

    return False




# 🔹 CREATE PIPELINE
@router.post("/pipelines/create")
def create_pipeline(payload: dict, db: Session = Depends(get_db)):
    pipeline = Pipeline(
        name=payload["name"],
        source=payload["source"],
        destination=payload["destination"],
        file_path=payload.get("file_path"),
        api_url=payload.get("api_url"),
        schedule_type=payload.get("schedule_type"),
        is_active=payload.get("is_active", False)
        
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

    pipeline.status = "running"
    pipeline.logs = ""
    pipeline.error = None
    db.commit()

    try:
        logs.append("🚀 Pipeline started")

        # ==================================================
        # CSV PIPELINE
        # ==================================================
        if pipeline.source == "csv":

            logs.append(f"📂 Input path: {pipeline.file_path}")

            if not pipeline.file_path:
                raise Exception("CSV file path missing")

            base_dir = os.getcwd()
            file_path = os.path.join(base_dir, pipeline.file_path)

            logs.append(f"📂 Resolved path: {file_path}")

            if not os.path.exists(file_path):
                raise Exception(f"File not found at {file_path}")

            with open(file_path, "r", encoding="utf-8") as f:

                reader = csv.DictReader(f)

                if not reader.fieldnames:
                    raise Exception("CSV has no headers")

                columns = reader.fieldnames

                logs.append(f"📊 Columns: {columns}")

                safe_columns = [
                    col.strip().replace(" ", "_")
                    for col in columns
                ]

                col_defs = ", ".join(
                    [f"{col} TEXT" for col in safe_columns]
                )

                logs.append("🧹 Dropping old table")

                db.execute(
                    text(
                        f"DROP TABLE IF EXISTS {pipeline.destination}"
                    )
                )

                logs.append("🏗 Creating table")

                db.execute(
                    text(
                        f"""
                        CREATE TABLE {pipeline.destination}
                        (
                            {col_defs}
                        )
                        """
                    )
                )

                count = 0

                for row in reader:

                    clean_row = {
                        col.strip().replace(" ", "_"): value
                        for col, value in row.items()
                    }

                    values = ", ".join(
                        [f":{col}" for col in safe_columns]
                    )

                    db.execute(
                        text(
                            f"""
                            INSERT INTO {pipeline.destination}
                            VALUES ({values})
                            """
                        ),
                        clean_row
                    )

                    count += 1

                db.commit()

                logs.append(
                    f"✅ Inserted {count} rows"
                )

        # ==================================================
        # API PIPELINE
        # ==================================================
        elif pipeline.source == "api":

            if not pipeline.api_url:
                raise Exception("API URL missing")

            logs.append(f"🌐 API URL: {pipeline.api_url}")

            response = requests.get(
                pipeline.api_url,
                timeout=30
            )

            response.raise_for_status()

            data = response.json()

            if not isinstance(data, list):
                raise Exception(
                    "API must return JSON array"
                )

            if len(data) == 0:
                raise Exception(
                    "API returned empty data"
                )

            columns = list(data[0].keys())

            logs.append(
                f"📊 Columns: {columns}"
            )

            safe_columns = [
                col.strip().replace(" ", "_")
                for col in columns
            ]

            col_defs = ", ".join(
                [f"{col} TEXT" for col in safe_columns]
            )

            logs.append(
                "🧹 Dropping old table"
            )

            db.execute(
                text(
                    f"DROP TABLE IF EXISTS {pipeline.destination}"
                )
            )

            logs.append(
                "🏗 Creating table"
            )

            db.execute(
                text(
                    f"""
                    CREATE TABLE {pipeline.destination}
                    (
                        {col_defs}
                    )
                    """
                )
            )

            count = 0

            for row in data:

                clean_row = {
                    col.strip().replace(" ", "_"):
                    str(row.get(col))
                    for col in columns
                }

                values = ", ".join(
                    [f":{col}" for col in safe_columns]
                )

                db.execute(
                    text(
                        f"""
                        INSERT INTO {pipeline.destination}
                        VALUES ({values})
                        """
                    ),
                    clean_row
                )

                count += 1

            db.commit()

            logs.append(
                f"✅ Inserted {count} rows"
            )

        else:
            raise Exception(
                f"Unsupported source type: {pipeline.source}"
            )

        # ==================================================
        # SUCCESS
        # ==================================================
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

        return {
            "message": "Pipeline executed successfully"
        }

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

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    
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



@router.post("/pipelines/run-scheduler")
def run_scheduler(
    db: Session = Depends(get_db)
):

    active_pipelines = (
        db.query(Pipeline)
        .filter(Pipeline.is_active == True)
        .all()
    )

    executed = []

    for pipeline in active_pipelines:
        try:
            if should_run_pipeline(pipeline):
                execute_pipeline(
                    pipeline,
                    db
                )

                pipeline.last_scheduled_run = datetime.utcnow()

                db.commit()

                executed.append({
                    "id": pipeline.id,
                    "name": pipeline.name,
                    "status": "success",
                    "schedule": pipeline.schedule_type
                })
            else:
                executed.append({
                    "id": pipeline.id,
                    "name": pipeline.name,
                    "status": "skipped",
                    "schedule": pipeline.schedule_type
                })
        except Exception as e:
            executed.append({
                "id": pipeline.id,
            "name": pipeline.name,
            "status": "failed",
            "error": str(e)
        })

    return {
        "pipelines_found":
        len(active_pipelines),

        "pipelines_executed":
        len(executed),

        "results":
        executed
    }