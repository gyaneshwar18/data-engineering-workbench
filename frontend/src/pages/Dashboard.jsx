import { useEffect, useState } from "react";
import axios from "axios";
import MetricCard from "../components/MetricCard";
import ProfileSnapshotCard from "../components/ProfileSnapshotCard";
import QueryChart from "../components/QueryChart";
import GithubHeatmap from "../components/GithubHeatmap";



export default function Dashboard() {
  const [stats, setStats] = useState(null);

useEffect(() => {
  axios
    .get("http://127.0.0.1:8000/dashboard/stats")
    .then((res) => {
      setStats(res.data);
    })
    .catch((err) => {
      console.error("API Error:", err);
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
          <MetricCard label="SQL Queries" value={stats?.sql_queries ?? 0} />
        </div>

        <div className="col-span-3">
          <MetricCard label="Pipelines" value={stats?.pipelines ?? 0} />
        </div>

        <div className="col-span-3">
          <MetricCard label="Datasets" value={stats?.datasets ?? 0} />
        </div>

        <div className="col-span-3">
          <MetricCard label="API Sources" value={stats?.api_sources ?? 0} />
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
