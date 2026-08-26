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

from datetime import datetime
import io
import csv
import pandas as pd
import re


router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"]
)


# ==============================================================
# Helpers
# ==============================================================

def validate_table_name(table_name: str) -> str:
    """
    Allow only PostgreSQL-style simple table names.

    This prevents arbitrary SQL from being injected into
    places where table names cannot be passed as parameters.
    """

    if not re.fullmatch(r"[a-zA-Z_][a-zA-Z0-9_]*", table_name):
        raise HTTPException(
            status_code=400,
            detail="Invalid table name."
        )

    return table_name


def table_exists(
    table_name: str,
    db: Session,
) -> bool:

    result = db.execute(
        text("""
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_name = :table_name
            )
        """),
        {
            "table_name": table_name
        }
    ).scalar()

    return bool(result)


# ==============================================================
# LIST ALL DATASETS
# ==============================================================

@router.get("/")
def list_datasets(
    db: Session = Depends(get_db)
):

    try:

        result = db.execute(
            text("""
                SELECT
                    table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_type = 'BASE TABLE'
                  AND table_name != 'alembic_version'
                ORDER BY table_name
            """)
        ).fetchall()

        datasets = []

        for row in result:

            table_name = row.table_name

            # --------------------------------------------------
            # Row count
            # --------------------------------------------------

            row_count = db.execute(
                text(
                    f'SELECT COUNT(*) FROM "{table_name}"'
                )
            ).scalar()

            # --------------------------------------------------
            # Column count
            # --------------------------------------------------

            column_count = db.execute(
                text("""
                    SELECT COUNT(*)
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                      AND table_name = :table_name
                """),
                {
                    "table_name": table_name
                }
            ).scalar()

            datasets.append({
                "table_name": table_name,

                # Current datasets are PostgreSQL tables
                "type": "table",
                "source": "database",

                "row_count": row_count or 0,
                "column_count": column_count or 0,

                # We don't currently store dataset-specific
                # updated_at metadata.
                "updated_at": None,
            })

        return datasets

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to load datasets: {str(e)}"
        )


# ==============================================================
# UPLOAD CSV DATASET
# ==============================================================

@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

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

        # ------------------------------------------------------
        # Read uploaded CSV
        # ------------------------------------------------------

        contents = await file.read()

        df = pd.read_csv(
            io.BytesIO(contents)
        )

        if df.empty:

            raise HTTPException(
                status_code=400,
                detail="The CSV file is empty."
            )

        # ------------------------------------------------------
        # Generate safe table name
        # ------------------------------------------------------

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

        # ------------------------------------------------------
        # Create / replace PostgreSQL table
        # ------------------------------------------------------

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

            "type": "csv",

            "source": "csv",

            "row_count": len(df),

            "column_count": len(df.columns),

            "updated_at": datetime.utcnow(),
        }

    except HTTPException:
        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload dataset: {str(e)}"
        )


# ==============================================================
# DATASET PREVIEW
# ==============================================================

@router.get("/{table_name}")
def preview_dataset(
    table_name: str,
    db: Session = Depends(get_db)
):

    table_name = validate_table_name(table_name)

    if not table_exists(table_name, db):

        raise HTTPException(
            status_code=404,
            detail="Dataset not found."
        )

    try:

        result = db.execute(
            text(
                f'''
                SELECT *
                FROM "{table_name}"
                LIMIT 10
                '''
            )
        ).fetchall()

        return [
            dict(row._mapping)
            for row in result
        ]

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to preview dataset: {str(e)}"
        )


# ==============================================================
# DATASET SCHEMA
# ==============================================================

@router.get("/{table_name}/schema")
def get_dataset_schema(
    table_name: str,
    db: Session = Depends(get_db)
):

    table_name = validate_table_name(table_name)

    if not table_exists(table_name, db):

        raise HTTPException(
            status_code=404,
            detail="Dataset not found."
        )

    try:

        result = db.execute(
            text("""
                SELECT
                    column_name,
                    data_type
                FROM information_schema.columns
                WHERE table_schema = 'public'
                  AND table_name = :table_name
                ORDER BY ordinal_position
            """),
            {
                "table_name": table_name
            }
        ).fetchall()

        return [
            dict(row._mapping)
            for row in result
        ]

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to load dataset schema: {str(e)}"
        )


# ==============================================================
# DATASET STATS
# ==============================================================

@router.get("/{table_name}/stats")
def get_dataset_stats(
    table_name: str,
    db: Session = Depends(get_db)
):

    table_name = validate_table_name(table_name)

    if not table_exists(table_name, db):

        raise HTTPException(
            status_code=404,
            detail="Dataset not found."
        )

    try:

        # ------------------------------------------------------
        # Row count
        # ------------------------------------------------------

        row_count = db.execute(
            text(
                f'''
                SELECT COUNT(*)
                FROM "{table_name}"
                '''
            )
        ).scalar()

        # ------------------------------------------------------
        # Column count
        # ------------------------------------------------------

        column_count = db.execute(
            text("""
                SELECT COUNT(*)
                FROM information_schema.columns
                WHERE table_schema = 'public'
                  AND table_name = :table_name
            """),
            {
                "table_name": table_name
            }
        ).scalar()

        return {
            "row_count": row_count or 0,
            "column_count": column_count or 0,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to load dataset stats: {str(e)}"
        )


# ==============================================================
# EXPORT DATASET
# ==============================================================

@router.get("/{table_name}/export")
def export_dataset(
    table_name: str,
    db: Session = Depends(get_db)
):

    table_name = validate_table_name(table_name)

    if not table_exists(table_name, db):

        raise HTTPException(
            status_code=404,
            detail="Dataset not found."
        )

    try:

        result = db.execute(
            text(
                f'''
                SELECT *
                FROM "{table_name}"
                '''
            )
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
                    f'attachment; filename="{table_name}.csv"'
            }
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to export dataset: {str(e)}"
        )