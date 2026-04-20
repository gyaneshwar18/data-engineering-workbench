from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Pipeline

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