import MetricCard from "../components/MetricCard";
import ProfileSnapshotCard from "../components/ProfileSnapshotCard";
import QueryChart from "../components/QueryChart";
import GithubHeatmap from "../components/GithubHeatmap";

export default function Dashboard() {
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-12 gap-6 mb-6">

        <div className="col-span-3">
          <MetricCard title="SQL Queries" value="128"/>
        </div>

        <div className="col-span-3">
          <MetricCard title="Pipelines" value="6"/>
        </div>

        <div className="col-span-3">
          <MetricCard title="Datasets" value="14"/>
        </div>

        <div className="col-span-3">
          <MetricCard title="API Sources" value="3"/>
        </div>

      </div>

      {/* Charts + Profile */}
      <div className="grid grid-cols-12 gap-6">

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
