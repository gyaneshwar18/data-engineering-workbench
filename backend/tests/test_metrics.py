from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_query_stats():

    response = client.get("/metrics/query-stats")

    assert response.status_code == 200


def test_pipeline_analytics():

    response = client.get("/metrics/pipeline-analytics")

    assert response.status_code == 200


def test_dashboard_overview():
    response = client.get("/dashboard/overview")

    assert response.status_code == 200
    assert set(response.json()) == {
        "stats",
        "metrics",
        "performance",
        "pipelineAnalytics",
        "pipelineTrends",
    }


def test_sql_lab_metadata():
    response = client.get("/sql-lab/metadata")

    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload["tables"], list)
    assert isinstance(payload["columns"], dict)
