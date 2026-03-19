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

  const [metrics, setMetrics] = useState(null);
  const [performance, setPerformance] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const [statsRes, metricsRes, perfRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard/stats`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/metrics/query-stats`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/metrics/query-performance`)
        ]);

        setStats(statsRes.data);
        setMetrics(metricsRes.data);
        setPerformance(perfRes.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-8">
        Dashboard Overview
      </h1>

      {/* ✅ CORE PRODUCT METRICS */}
      <div className="grid grid-cols-12 gap-8 mb-8">

        <div className="col-span-3">
          <MetricCard label="SQL Queries" value={stats.sql_queries} />
        </div>

        <div className="col-span-3">
          <MetricCard label="Pipelines" value={stats.pipelines} />
        </div>

        <div className="col-span-3">
          <MetricCard label="Datasets" value={stats.datasets} />
        </div>

        <div className="col-span-3">
          <MetricCard label="API Sources" value={stats.api_sources} />
        </div>

      </div>


      {/* 🔥 REAL PERFORMANCE CHART */}
      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-8">
          <QueryChart
  data={performance?.queries_per_day}
  metrics={metrics}
/>
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