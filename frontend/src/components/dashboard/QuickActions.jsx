import { useState } from "react";
import { createPipeline } from "../../api/pipelineApi";



import {
  Plus,
  Upload,
  Database,
  Table,
} from "lucide-react";

import ActionCard from "./ActionCard";
import CreatePipelineDialog from "../Pipelines/CreatePipelineDialog";

const [uploadOpen, setUploadOpen] = useState(false);
const [uploading, setUploading] = useState(false);
const [datasetUploaded, setDatasetUploaded] = useState(false);
const handleDatasetUpload = async (file) => {
  try {
    setUploading(true);

    await uploadDataset(file);

    setUploadOpen(false);
    setDatasetUploaded(true);

  } catch (error) {
    console.error("Dataset upload failed:", error);

    alert(
      error?.response?.data?.detail ||
      "Failed to upload dataset."
    );
  } finally {
    setUploading(false);
  }
};

export default function QuickActions() {
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleCreate = async (pipelineData) => {
    try {
      setCreating(true);

      await createPipeline(pipelineData);

      setCreateOpen(false);
      setCreated(true);

    } catch (error) {
      console.error("Create pipeline error:", error);

      alert(
        error?.response?.data?.detail ||
        "Failed to create pipeline."
      );
    } finally {
      setCreating(false);
    }
  };

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
          color="green"
          onClick={() => {
            setCreated(false);
            setCreateOpen(true);
          }}
        />

        <ActionCard
          icon={Upload}
          title="Upload Dataset"
          subtitle="Import CSV into platform"
          color="blue"
          onClick={() => {
            setDatasetUploaded(false);
            setUploadOpen(true);
          }}
        />

        <ActionCard
          icon={Database}
          title="SQL Lab"
          subtitle="Write and execute SQL"
          to="/workbench/sql-lab"
          color="purple"
        />

        <ActionCard
          icon={Table}
          title="Browse Datasets"
          subtitle="Explore available datasets"
          to="/workbench/datasets"
          color="amber"
        />

      </div>

      {/* Success Message */}

      {created && (
        <div
          className="
            mx-4
            mb-4
            rounded-xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-4
            py-3
          "
        >
          <p className="text-sm font-medium text-emerald-400">
            Pipeline created successfully.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/workbench/pipelines";
            }}
            className="
              mt-1
              text-xs
              font-medium
              text-emerald-300
              hover:text-emerald-200
              transition
            "
          >
            View Pipelines →
          </button>
        </div>
      )}

      {/* Create Pipeline Dialog */}

      <CreatePipelineDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        creating={creating}
      />

      <UploadDatasetDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleDatasetUpload}
        uploading={uploading}
      />

    </div>
  );
}