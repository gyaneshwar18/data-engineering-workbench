from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_db

router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"]
)


# 🔥 LIST ALL TABLES
@router.get("/")
def list_datasets(db: Session = Depends(get_db)):

    result = db.execute(text("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name
    """)).fetchall()

    return [
        {"table_name": row.table_name}
        for row in result
    ]