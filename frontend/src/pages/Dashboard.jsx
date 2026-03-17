import { useEffect, useState } from "react";
import axios from "axios";

import MetricCard from "../components/MetricCard";
import ProfileSnapshotCard from "../components/ProfileSnapshotCard";
import QueryChart from "../components/QueryChart";
import GithubHeatmap from "../components/GithubHeatmap";

export default function Dashboard() {

  const [stats, setStats] = useState({
    sql_queries: 0,
    pipelines: 0,
    datasets: 0,
    api_sources: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchStats = async () => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/dashboard/stats`
        );

        setStats(response.data);
      } catch (err) {

        console.error("Dashboard API Error:", err);
        setError("Failed to load dashboard metrics.");

      } finally {
        setLoading(false);
      }
    };

    fetchStats();

  }, []);

  const [metrics, setMetrics] = useState(null);

useEffect(() => {

  axios.get(`${import.meta.env.VITE_API_BASE_URL}/metrics/query-stats`)
    .then(res => setMetrics(res.data))
    .catch(err => console.error(err));

}, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-8">
        Dashboard Overview
      </h1>

      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-12 gap-8 mb-8">

        <div className="col-span-3">
          <MetricCard
            label="SQL Queries"
            value={loading ? "..." : stats.sql_queries}
          />
        </div>

        <div className="col-span-3">
          <MetricCard
            label="Pipelines"
            value={loading ? "..." : stats.pipelines}
          />
        </div>

        <div className="col-span-3">
          <MetricCard
            label="Datasets"
            value={loading ? "..." : stats.datasets}
          />
        </div>

        <div className="col-span-3">
          <MetricCard
            label="API Sources"
            value={loading ? "..." : stats.api_sources}
          />
        </div>

      </div>

      {/* Charts + Profile */}
      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-8">
          <QueryChart />
        </div>

        <div className="col-span-4">
          <ProfileSnapshotCard />
        </div>

        <div className="col-span-8">
          <GithubHeatmap />
        </div>

      </div>

    </div>
  );
}