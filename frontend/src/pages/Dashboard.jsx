import { useEffect, useState } from "react";
import axios from "axios";

import MetricCard from "../components/MetricCard";
import ProfileSnapshotCard from "../components/ProfileSnapshotCard";
import QueryChart from "../components/QueryChart";
import GithubHeatmap from "../components/GithubHeatmap";
import DashboardHeader from "../components/dashboard/DashboardHeader";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [pipelineAnalytics, setPipelineAnalytics] = useState(null);
  const [pipelineTrends, setPipelineTrends] = useState([]);

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        statsRes,
        metricsRes,
        perfRes,
        pipelineRes,
        trendRes
      ] = await Promise.all([
        axios.get(`${API}/dashboard/stats`),
        axios.get(`${API}/metrics/query-stats`),
        axios.get(`${API}/metrics/query-performance`),
        axios.get(`${API}/metrics/pipeline-analytics`),
        axios.get(`${API}/metrics/pipeline-trends`)
      ]);

      setStats(statsRes.data);
      setMetrics(metricsRes.data);
      setPerformance(perfRes.data);
      setPipelineAnalytics(pipelineRes.data);
      setPipelineTrends(trendRes.data);
      setLastUpdated(new Date());

    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (
    loading ||
    !stats ||
    !performance ||
    !pipelineAnalytics
  ) {
    return <p className="text-white p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 text-white space-y-6">

      {/* HEADER */}
      <DashboardHeader onRefresh={fetchData} loading={loading} lastUpdated={lastUpdated} />

      {/* 🔥 KPI CARDS */}
      <div className="grid grid-cols-12 gap-6">

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

      {/* 🔥 PIPELINE HEALTH */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Pipeline Health
        </h2>

        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-3">
            <MetricCard
              label="Active Pipelines"
              value={pipelineAnalytics.active_pipelines}
            />
          </div>

          <div className="col-span-3">
            <MetricCard
              label="Success Rate %"
              value={pipelineAnalytics.success_rate}
            />
          </div>

          <div className="col-span-3">
            <MetricCard
              label="Successful Runs"
              value={pipelineAnalytics.successful_runs}
            />
          </div>

          <div className="col-span-3">
            <MetricCard
              label="Failed Runs"
              value={pipelineAnalytics.failed_runs}
            />
          </div>

        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded">

        <h3 className="mb-3">
          Pipeline Execution Trend
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={pipelineTrends}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#444"
            />

            <XAxis
              dataKey="date"
              stroke="#aaa"
            />

            <YAxis
              stroke="#aaa"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="success"
              stroke="#22c55e"
              name="Success"
            />

            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              name="Failed"
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* 🔥 MAIN SECTION */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT GRAPH */}
        <div className="col-span-8">
          <QueryChart
            data={performance.queries_per_day}
            metrics={metrics}
          />
        </div>

        {/* RIGHT PROFILE */}
        <div className="col-span-4">
          <ProfileSnapshotCard />
        </div>

      </div>

      {/* 🔥 GITHUB HEATMAP */}
      <div>
        <GithubHeatmap />
      </div>

      {/* 🔥 EXECUTION TREND */}
      <div className="bg-gray-900 p-4 rounded">
        <h3 className="mb-3">Execution Time Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performance.execution_trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="avg_time" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* 🔥 TOP SLOW QUERIES */}


    </div>
  );
}