import {
  Plus,
  Database,
  Upload,
  CalendarClock,
} from "lucide-react";

import ActionCard from "./ActionCard";

export default function QuickActions() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-6
      "
    >
      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <p className="text-slate-400 mt-1">
          Frequently used operations across your platform
        </p>

      </div>

      {/* Action Grid */}

      <div className="grid grid-cols-2 gap-4">

        <ActionCard
          icon={Plus}
          title="New Pipeline"
          subtitle="Create ETL pipeline"
          to="/pipelines"
          color="green"
        />

        <ActionCard
          icon={Upload}
          title="Upload Dataset"
          subtitle="Import CSV files"
          to="/datasets"
          color="blue"
        />

        <ActionCard
          icon={Database}
          title="SQL Lab"
          subtitle="Run SQL queries"
          to="/sql-lab"
          color="purple"
        />

        <ActionCard
          icon={CalendarClock}
          title="Scheduler"
          subtitle="Manage schedules"
          to="/pipelines"
          color="amber"
        />

      </div>
    </div>
  );
}