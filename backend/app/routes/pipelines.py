from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Pipeline
from datetime import datetime
import csv
from sqlalchemy import text

# ✅ THIS MUST COME BEFORE ANY ROUTES
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


# 🔹 RUN PIPELINE
@router.post("/pipelines/run/{pipeline_id}")
def run_pipeline(pipeline_id: int, db: Session = Depends(get_db)):

    pipeline = db.query(Pipeline).filter(Pipeline.id == pipeline_id).first()

    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    pipeline.status = "running"
    db.commit()

    try:
        if pipeline.source == "csv":

            with open(pipeline.file_path, "r") as f:
                reader = csv.DictReader(f)
                columns = reader.fieldnames

                col_defs = ", ".join([f"{col} TEXT" for col in columns])

                db.execute(text(f"DROP TABLE IF EXISTS {pipeline.destination}"))
                
                db.execute(text(f"""
                    CREATE TABLE IF NOT EXISTS {pipeline.destination} (
                        {col_defs}
                    );
                """))

                for row in reader:
                    values = ", ".join([f":{col}" for col in columns])
                    db.execute(
                        text(f"INSERT INTO {pipeline.destination} VALUES ({values})"),
                        row
                    )

                db.commit()

        pipeline.status = "success"
        pipeline.last_run = datetime.utcnow()
        db.commit()

        return {"message": "Pipeline executed successfully"}

    except Exception as e:
        pipeline.status = "failed"
        db.commit()
        raise HTTPException(status_code=500, detail=str(e))