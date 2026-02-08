import MetricCard from "../components/MetricCard";
import Panel from "../components/Panel";
import ProfileSnapshotCard from "../components/ProfileSnapshotCard";

export default function Dashboard() {
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

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
          <MetricCard title="APIs" value="3"/>
        </div>

        <div className="col-span-8">
          <Panel title="Query Growth Chart"/>
        </div>

        <div className="col-span-4">
          <ProfileSnapshotCard/>
        </div>

      </div>

    </div>
  );
}
