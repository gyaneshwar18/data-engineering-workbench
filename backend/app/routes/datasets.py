from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
)

from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from fastapi.responses import StreamingResponse

import io
import csv
import pandas as pd
import re


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

# 🔥 UPLOAD CSV DATASET
@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # Validate file type
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported."
        )

    try:
        # Read uploaded file
        contents = await file.read()

        df = pd.read_csv(io.BytesIO(contents))

        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="The CSV file is empty."
            )

        # Create safe table name from filename
        table_name = re.sub(
            r"[^a-zA-Z0-9_]",
            "_",
            file.filename.rsplit(".", 1)[0]
        ).lower()

        # Prevent table name starting with a number
        if table_name and table_name[0].isdigit():
            table_name = f"dataset_{table_name}"

        if not table_name:
            table_name = "uploaded_dataset"

        # Create / replace PostgreSQL table
        df.to_sql(
            table_name,
            con=db.bind,
            if_exists="replace",
            index=False,
        )

        return {
            "message": "Dataset uploaded successfully.",
            "table_name": table_name,
            "filename": file.filename,
            "row_count": len(df),
            "column_count": len(df.columns),
        }

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload dataset: {str(e)}"
        )
    
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

@router.get("/{table_name}/export")
def export_dataset(
    table_name: str,
    db: Session = Depends(get_db)
):

    result = db.execute(
        text(f"SELECT * FROM {table_name}")
    )

    rows = result.fetchall()

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow(result.keys())

    for row in rows:
        writer.writerow(row)

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            f"attachment; filename={table_name}.csv"
        }
    )