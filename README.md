# Data Engineering Workbench

A hands-on Data Engineering project built using Python, FastAPI, PostgreSQL, and React.

## Features

- **Dashboard:** View data pipeline metrics and analytics.
- **Pipelines:** Manage and monitor data pipelines.
- **Datasets:** Upload and manage datasets.
- **Metrics:** Track pipeline performance.
- **SQL Lab:** Execute SQL queries and explore data.
- **Query History:** Access previously executed queries.

## Tech Stack

**Backend:** Python, FastAPI, PostgreSQL, SQLAlchemy

**Frontend:** React, Vite, Tailwind CSS

**Database:** PostgreSQL

## Run locally

You will need Python 3.11, Node.js 20, and a running PostgreSQL database. Create the database `de_workbench`, then add these local environment files:

`backend/.env`:

```env
DATABASE_URL=postgresql://postgres:<YOUR_PASSWORD>@localhost:5432/de_workbench
```

`frontend/.env.local`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

In one terminal, install and start the backend from the repository root:

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

In a second terminal, install and start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. Keep both terminal processes running while using the app. Do not commit `.env` files or put real passwords in this README.

## Project Structure

```text
data-engineering-workbench/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

## Purpose

This project demonstrates practical data engineering concepts, including SQL operations, dataset management, pipeline monitoring, and analytics.

## Author

Gyaneshwar
