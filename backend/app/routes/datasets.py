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

# 🔥 DATASET PREVIEW
@router.get("/{table_name}")
def preview_dataset(
    table_name: str,
    db: Session = Depends(get_db)
):
    result = db.execute(
        text(f"""
            SELECT *
            FROM {table_name}
            LIMIT 10
        """)
    ).fetchall()

    return [
        dict(row._mapping)
        for row in result
    ]

# 🔥 DATASET SCHEMA
@router.get("/{table_name}/schema")
def get_dataset_schema(
    table_name: str,
    db: Session = Depends(get_db)
):  

    result = db.execute(
        text("""
            SELECT
                column_name,
                data_type
            FROM information_schema.columns
            WHERE table_name = :table_name
            ORDER BY ordinal_position
        """),
        {"table_name": table_name}
    ).fetchall()

    return [
        dict(row._mapping)
        for row in result
    ]

# 🔥 DATASET STATS
@router.get("/{table_name}/stats")
def get_dataset_stats(
    table_name: str,
    db: Session = Depends(get_db)
):

    row_count = db.execute(
        text(f"SELECT COUNT(*) FROM {table_name}")
    ).scalar()

    column_count = db.execute(
        text("""
            SELECT COUNT(*)
            FROM information_schema.columns
            WHERE table_name = :table_name
        """),
        {"table_name": table_name}
    ).scalar()

    return {
        "row_count": row_count,
        "column_count": column_count
    }