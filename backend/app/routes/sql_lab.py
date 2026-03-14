from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from pydantic import BaseModel

router = APIRouter()


class SQLQuery(BaseModel):
    query: str


@router.post("/sql-lab/run")
def run_query(payload: SQLQuery, db: Session = Depends(get_db)):
    try:
        result = db.execute(text(payload.query))

        rows = result.fetchall()
        columns = list(result.keys())   # convert to list

        data = [dict(zip(columns, row)) for row in rows]

        return {
            "columns": columns,
            "rows": data
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))