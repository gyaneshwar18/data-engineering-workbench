import { useEffect, useState } from "react";
import axios from "axios";

import MetricCard from "../components/ui/MetricCard";
import QueryChart from "../components/QueryChart";
import GithubHeatmap from "../components/dashboard/GithubHeatmap";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import PipelineTrendChart from "../components/dashboard/PipelineTrendChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

import {
  Database,
  Workflow,
  Table,
  Globe,
  BadgeCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

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
        trendRes,
      ] = await Promise.all([
        axios.get(`${API}/dashboard/stats`),
        axios.get(`${API}/metrics/query-stats`),
        axios.get(`${API}/metrics/query-performance`),
        axios.get(`${API}/metrics/pipeline-analytics`),
        axios.get(`${API}/metrics/pipeline-trends`),
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
    return (
      <p
        className="
          p-4
          text-white
          sm:p-5
          md:p-6
        "
      >
        Loading dashboard...
      </p>
    );
  }

  return (
    <div
      className="
        min-w-0
        space-y-5
        p-4
        text-white

        sm:space-y-6
        sm:p-5

        md:p-6
      "
    >
      {/* Header */}
      <DashboardHeader
        onRefresh={fetchData}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      {/* KPI Cards */}
      <div
        className="
          grid
          min-w-0
          grid-cols-12
          gap-4

          md:gap-6
        "
      >
        <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
          <MetricCard
            title="SQL Queries"
            value={stats.sql_queries}
            subtitle={`${stats.sql_queries} Total`}
            icon={Database}
            color="blue"
          />
        </div>

        <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
          <MetricCard
            title="Pipelines"
            value={stats.pipelines}
            subtitle={`${pipelineAnalytics.active_pipelines} Active`}
            icon={Workflow}
            color="green"
          />
        </div>

        <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
          <MetricCard
            title="Datasets"
            value={stats.datasets}
            subtitle="Available"
            icon={Table}
            color="purple"
          />
        </div>

        <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
          <MetricCard
            title="API Sources"
            value={stats.api_sources}
            subtitle="Connected"
            icon={Globe}
            color="amber"
          />
        </div>
      </div>

      {/* Pipeline Health */}
      <section className="min-w-0">
        <h2
          className="
            mb-3
            text-lg
            font-semibold
            tracking-tight

            sm:mb-4
            sm:text-xl
          "
        >
          Pipeline Health
        </h2>

        <div
          className="
            grid
            min-w-0
            grid-cols-12
            gap-4

            md:gap-6
          "
        >
          <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
            <MetricCard
              title="Active Pipelines"
              value={pipelineAnalytics.active_pipelines}
              subtitle="Currently Running"
              icon={Workflow}
              color="green"
            />
          </div>

          <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
            <MetricCard
              title="Success Rate"
              value={`${pipelineAnalytics.success_rate}%`}
              subtitle="Overall Health"
              icon={BadgeCheck}
              color="blue"
            />
          </div>

          <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
            <MetricCard
              title="Successful Runs"
              value={pipelineAnalytics.successful_runs}
              subtitle="Completed Jobs"
              icon={CheckCircle2}
              color="green"
            />
          </div>

          <div className="col-span-12 min-w-0 md:col-span-6 xl:col-span-3">
            <MetricCard
              title="Failed Runs"
              value={pipelineAnalytics.failed_runs}
              subtitle="Requires Attention"
              icon={AlertTriangle}
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Pipeline Trend */}
      <div className="min-w-0">
        <PipelineTrendChart data={pipelineTrends} />
      </div>

      {/* Analytics */}
      <div
        className="
          grid
          min-w-0
          grid-cols-12
          gap-4

          md:gap-6
        "
      >
        {/* Query Analytics */}
        <div className="col-span-12 min-w-0">
          <QueryChart
            data={performance.queries_per_day}
            metrics={metrics}
          />
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 min-w-0 xl:col-span-3">
          <QuickActions />
        </div>

        {/* GitHub */}
        <div className="col-span-12 min-w-0 xl:col-span-9">
          <GithubHeatmap />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="min-w-0">
        <RecentActivity />
      </div>
    </div>
  );
}