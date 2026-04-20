from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Pipeline
from datetime import datetime
from sqlalchemy import text

router = APIRouter()

# 🔹 Create pipeline
@router.post("/pipelines/create")
def create_pipeline(payload: dict, db: Session = Depends(get_db)):
    pipeline = Pipeline(
        name=payload["name"],
        source=payload["source"],
        destination=payload["destination"]
    )

    db.add(pipeline)
    db.commit()

    return {"message": "Pipeline created"}

@router.get("/pipelines")
def get_pipelines(db: Session = Depends(get_db)):
    pipelines = db.query(Pipeline).all()
    return pipelines

@router.post("/pipelines/run/{pipeline_id}")
def run_pipeline(pipeline_id: int, db: Session = Depends(get_db)):

    pipeline = db.query(Pipeline).filter(Pipeline.id == pipeline_id).first()

    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    # 🔄 mark running
    pipeline.status = "running"
    db.commit()

    try:
        # 🧠 BASIC EXECUTION (v1)
        if pipeline.source == "csv":
            # For now simulate load (since CSV already handled in SQL Lab)
            # Later we will integrate actual file processing
            pass

        elif pipeline.source == "api":
            # future step
            pass

        # ✅ mark success
        pipeline.status = "success"
        pipeline.last_run = datetime.utcnow()

        db.commit()

        return {"message": "Pipeline executed successfully"}

    except Exception as e:
        pipeline.status = "failed"
        db.commit()

        raise HTTPException(status_code=500, detail=str(e))