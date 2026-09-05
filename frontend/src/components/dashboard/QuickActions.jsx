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
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/90
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl

        sm:rounded-3xl
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-slate-800
          px-3.5
          py-3

          sm:px-5
          sm:py-4

          md:px-6
          md:py-5
        "
      >
        <h2
          className="
            text-sm
            font-semibold
            leading-5
            tracking-tight
            text-white

            sm:text-lg
          "
        >
          Quick Actions
        </h2>

        <p
          className="
            mt-0.5
            truncate
            text-[9px]
            leading-4
            text-slate-400

            sm:mt-1
            sm:text-sm
          "
        >
          Frequently used operations across your platform
        </p>
      </div>

      {/* Actions */}

      <div
        className="
          space-y-1.5
          p-3

          sm:space-y-2
          sm:p-4
        "
      >
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

      {/* Pipeline Success Message */}

      {created && (
        <div
          className="
            mx-3
            mb-3
            rounded-xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-3
            py-2.5

            sm:mx-4
            sm:mb-4
            sm:px-4
            sm:py-3
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-emerald-400

              sm:text-sm
            "
          >
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
              text-[10px]
              font-medium
              text-emerald-300
              transition
              hover:text-emerald-200

              sm:text-xs
            "
          >
            View Pipelines →
          </button>
        </div>
      )}

      {/* Dataset Success Message */}

      {datasetUploaded && (
        <div
          className="
            mx-3
            mb-3
            rounded-xl
            border
            border-blue-500/20
            bg-blue-500/10
            px-3
            py-2.5

            sm:mx-4
            sm:mb-4
            sm:px-4
            sm:py-3
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-blue-400

              sm:text-sm
            "
          >
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
              text-[10px]
              font-medium
              text-blue-300
              transition
              hover:text-blue-200

              sm:text-xs
            "
          >
            View Datasets →
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

      {/* Upload Dataset Dialog */}

      <UploadDatasetDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleDatasetUpload}
        uploading={uploading}
      />
    </div>
  );
}