import { useEffect, useState } from "react";
import axios from "axios";
import MetricCard from "../components/MetricCard";
import ProfileSnapshotCard from "../components/ProfileSnapshotCard";
import QueryChart from "../components/QueryChart";
import GithubHeatmap from "../components/GithubHeatmap";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/dashboard/stats`)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">
        Dashboard Overview
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-12 gap-8 mb-8">

        <div className="col-span-3">
          <MetricCard 
            label="SQL Queries" 
            value={loading ? "..." : stats?.sql_queries} 
          />
        </div>

        <div className="col-span-3">
          <MetricCard 
            label="Pipelines" 
            value={loading ? "..." : stats?.pipelines} 
          />
        </div>

        <div className="col-span-3">
          <MetricCard 
            label="Datasets" 
            value={loading ? "..." : stats?.datasets} 
          />
        </div>

        <div className="col-span-3">
          <MetricCard 
            label="API Sources" 
            value={loading ? "..." : stats?.api_sources} 
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