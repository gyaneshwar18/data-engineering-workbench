import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "../api/httpClient";

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
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [pipelineAnalytics, setPipelineAnalytics] = useState(null);
  const [pipelineTrends, setPipelineTrends] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const hasLoadedRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      setLoadError(null);
      if (!hasLoadedRef.current) setLoading(true);

      let data;
      try {
        ({ data } = await apiClient.get(
          "/dashboard/overview"
        ));
      } catch (err) {
        if (err.response?.status !== 404) throw err;

        const [statsRes, metricsRes, performanceRes, analyticsRes, trendsRes] =
          await Promise.all([
            apiClient.get("/dashboard/stats"),
            apiClient.get("/metrics/query-stats"),
            apiClient.get("/metrics/query-performance"),
            apiClient.get("/metrics/pipeline-analytics"),
            apiClient.get("/metrics/pipeline-trends"),
          ]);

        data = {
          stats: statsRes.data,
          metrics: metricsRes.data,
          performance: performanceRes.data,
          pipelineAnalytics: analyticsRes.data,
          pipelineTrends: trendsRes.data,
        };
      }

      setStats(data.stats);
      setMetrics(data.metrics);
      setPerformance(data.performance);
      setPipelineAnalytics(data.pipelineAnalytics);
      setPipelineTrends(data.pipelineTrends);
      setLastUpdated(new Date());
      hasLoadedRef.current = true;
    } catch (err) {
      console.error("Dashboard error:", err);
      setLoadError(
        "Dashboard data could not be loaded. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (
    !stats ||
    !performance ||
    !pipelineAnalytics
  ) {
    return (
      <div
        className="
          flex
          min-h-48
          flex-col
          items-start
          justify-center
          gap-3
          p-4
          text-sm
          text-slate-300
          sm:p-5
          md:p-6
        "
      >
        <p role={loading ? "status" : "alert"}>
          {loading ? "Loading dashboard..." : loadError || "Dashboard data is unavailable."}
        </p>
        {!loading && (
          <button
            type="button"
            onClick={fetchData}
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
          >
            <RefreshCw size={15} />
            Retry
          </button>
        )}
      </div>
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
        <div className="col-span-6 min-w-0 xl:col-span-3">
          <MetricCard
            title="SQL Queries"
            value={stats.sql_queries}
            subtitle={`${stats.sql_queries} Total`}
            icon={Database}
            color="blue"
          />
        </div>

        <div className="col-span-6 min-w-0 xl:col-span-3">
          <MetricCard
            title="Pipelines"
            value={stats.pipelines}
            subtitle={`${pipelineAnalytics.active_pipelines} Active`}
            icon={Workflow}
            color="green"
          />
        </div>

        <div className="col-span-6 min-w-0 xl:col-span-3">
          <MetricCard
            title="Datasets"
            value={stats.datasets}
            subtitle="Available"
            icon={Table}
            color="purple"
          />
        </div>

        <div className="col-span-6 min-w-0 xl:col-span-3">
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
          <div className="col-span-6 min-w-0 xl:col-span-3">
            <MetricCard
              title="Active Pipelines"
              value={pipelineAnalytics.active_pipelines}
              subtitle="Currently Running"
              icon={Workflow}
              color="green"
            />
          </div>

          <div className="col-span-6 min-w-0 xl:col-span-3">
            <MetricCard
              title="Success Rate"
              value={`${pipelineAnalytics.success_rate}%`}
              subtitle="Overall Health"
              icon={BadgeCheck}
              color="blue"
            />
          </div>

          <div className="col-span-6 min-w-0 xl:col-span-3">
            <MetricCard
              title="Successful Runs"
              value={pipelineAnalytics.successful_runs}
              subtitle="Completed Jobs"
              icon={CheckCircle2}
              color="green"
            />
          </div>

          <div className="col-span-6 min-w-0 xl:col-span-3">
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
