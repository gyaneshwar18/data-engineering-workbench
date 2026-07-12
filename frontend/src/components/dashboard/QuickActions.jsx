import {
  Plus,
  Upload,
  Database,
  Table,
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
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-800">

        <h2 className="text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Frequently used operations across your platform
        </p>

      </div>

      {/* Actions */}

      <div className="p-4 space-y-2">

        <ActionCard
          icon={Plus}
          title="New Pipeline"
          subtitle="Create ETL workflow"
          to="/pipelines"
          color="green"
        />

        <ActionCard
          icon={Upload}
          title="Upload Dataset"
          subtitle="Import CSV into platform"
          to="/datasets"
          color="blue"
        />

        <ActionCard
          icon={Database}
          title="SQL Lab"
          subtitle="Write and execute SQL"
          to="/sql-lab"
          color="purple"
        />

        <ActionCard
          icon={Table}
          title="Browse Datasets"
          subtitle="Explore available datasets"
          to="/datasets"
          color="amber"
        />

      </div>
    </div>
  );
}