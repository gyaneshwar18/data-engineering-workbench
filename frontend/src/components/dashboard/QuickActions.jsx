import { useState } from "react";

import { createPipeline } from "../../api/pipelineApi";
import { uploadDataset } from "../../api/datasetApi";

import {
  Plus,
  Upload,
  Database,
  Table,
} from "lucide-react";

import ActionCard from "./ActionCard";
import CreatePipelineDialog from "../Pipelines/CreatePipelineDialog";
import UploadDatasetDialog from "../datasets/dialogs/UploadDatasetDialog";

export default function QuickActions() {
  // ------------------------------------------------------------
  // Create Pipeline State
  // ------------------------------------------------------------

  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  // ------------------------------------------------------------
  // Upload Dataset State
  // ------------------------------------------------------------

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [datasetUploaded, setDatasetUploaded] = useState(false);

  // ------------------------------------------------------------
  // Create Pipeline
  // ------------------------------------------------------------

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

  // ------------------------------------------------------------
  // Upload Dataset
  // ------------------------------------------------------------

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

        {/* New Pipeline */}

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


        {/* Upload Dataset */}

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


      {/* -------------------------------------------------------- */}
      {/* Pipeline Success Message */}
      {/* -------------------------------------------------------- */}

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
              window.location.href =
                "/workbench/pipelines";
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


      {/* -------------------------------------------------------- */}
      {/* Dataset Success Message */}
      {/* -------------------------------------------------------- */}

      {datasetUploaded && (
        <div
          className="
            mx-4
            mb-4
            rounded-xl
            border
            border-blue-500/20
            bg-blue-500/10
            px-4
            py-3
          "
        >

          <p className="text-sm font-medium text-blue-400">
            Dataset uploaded successfully.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "/workbench/datasets";
            }}
            className="
              mt-1
              text-xs
              font-medium
              text-blue-300
              hover:text-blue-200
              transition
            "
          >
            View Datasets →
          </button>

        </div>
      )}


      {/* -------------------------------------------------------- */}
      {/* Create Pipeline Dialog */}
      {/* -------------------------------------------------------- */}

      <CreatePipelineDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        creating={creating}
      />


      {/* -------------------------------------------------------- */}
      {/* Upload Dataset Dialog */}
      {/* -------------------------------------------------------- */}

      <UploadDatasetDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleDatasetUpload}
        uploading={uploading}
      />

    </div>
  );
}