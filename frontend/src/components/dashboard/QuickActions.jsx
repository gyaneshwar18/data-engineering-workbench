import {
  Plus,
  Upload,
  Database,
  Table,
} from "lucide-react";

import ActionCard from "./ActionCard";
import UploadDatasetDialog from "../datasets/dialogs/UploadDatasetDialog";
import { useState } from "react";

export default function QuickActions() {
  const [uploadOpen, setUploadOpen] = useState(false);

  const handleUpload = () => {
    /*
     * Upload backend functionality is not connected yet.
     *
     * For now the dialog opens from the Dashboard.
     * Once the backend upload endpoint is available,
     * the same upload handler used by Datasets.jsx
     * should be connected here.
     */
  };

  return (
    <>
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

          {/* New Pipeline */}
          <ActionCard
            icon={Plus}
            title="New Pipeline"
            subtitle="Create ETL workflow"
            to="/workbench/pipelines"
            color="green"
          />

          {/* Upload Dataset */}
          <ActionCard
            icon={Upload}
            title="Upload Dataset"
            subtitle="Import CSV into platform"
            onClick={() => setUploadOpen(true)}
            color="blue"
          />

          {/* SQL Lab */}
          <ActionCard
            icon={Database}
            title="SQL Lab"
            subtitle="Write and execute SQL"
            to="/workbench/sql-lab"
            color="purple"
          />

          {/* Browse Datasets */}
          <ActionCard
            icon={Table}
            title="Browse Datasets"
            subtitle="Explore available datasets"
            to="/workbench/datasets"
            color="amber"
          />

        </div>
      </div>

      <UploadDatasetDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
}