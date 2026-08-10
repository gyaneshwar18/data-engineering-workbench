import { useEffect, useState } from "react";
import axios from "axios";

import {
  createPipeline,
  getPipelineLogs,
} from "../api/pipelineApi";

import PipelineCard from "../components/Pipelines/PipelineCard";
import PipelineLogsModal from "../components/Pipelines/PipelineLogsModal";
import PipelineRunHistoryModal from "../components/Pipelines/PipelineRunHistoryModal";
import CreatePipelineDialog from "../components/Pipelines/CreatePipelineDialog";

import MetricsBar from "../components/ui/MetricsBar";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";

export default function Pipelines() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [runningPipelineId, setRunningPipelineId] =
    useState(null);

  const [creatingPipeline, setCreatingPipeline] =
    useState(false);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [logsOpen, setLogsOpen] = useState(false);
  const [logsData, setLogsData] = useState(null);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [selectedPipelineId, setSelectedPipelineId] =
    useState(null);

  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchPipelines();
  }, []);

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${API}/pipelines`
      );

      setPipelines(res.data);
    } catch (err) {
      console.error(err);

      setError("Unable to load pipelines.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Create Pipeline                                                        */
  /* ---------------------------------------------------------------------- */

  const handleCreatePipeline = async (pipelineData) => {
    try {
      setCreatingPipeline(true);
      setError(null);

      await createPipeline(pipelineData);

      setCreateOpen(false);

      await fetchPipelines();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to create pipeline."
      );
    } finally {
      setCreatingPipeline(false);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Run Pipeline                                                           */
  /* ---------------------------------------------------------------------- */

  const runPipeline = async (pipelineId) => {
    try {
      setRunningPipelineId(pipelineId);
      setError(null);

      await axios.post(
        `${API}/pipelines/run/${pipelineId}`
      );

      await fetchPipelines();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Pipeline execution failed."
      );
    } finally {
      setRunningPipelineId(null);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Logs                                                                   */
  /* ---------------------------------------------------------------------- */

  const handleViewLogs = async (pipelineId) => {
    try {
      setError(null);

      const data =
        await getPipelineLogs(pipelineId);

      setLogsData(data);
      setLogsOpen(true);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load pipeline logs."
      );
    }
  };

  /* ---------------------------------------------------------------------- */
  /* History                                                                */
  /* ---------------------------------------------------------------------- */

  const handleViewHistory = (pipelineId) => {
    setSelectedPipelineId(pipelineId);
    setHistoryOpen(true);
  };

  /* ---------------------------------------------------------------------- */
  /* Display Status                                                         */
  /* ---------------------------------------------------------------------- */

  const getPipelineWithDisplayStatus = (
    pipeline
  ) => {
    if (
      runningPipelineId === pipeline.id
    ) {
      return {
        ...pipeline,
        status: "running",
      };
    }

    return pipeline;
  };

  return (
    <div className="px-6 py-3 text-white">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}

        <PageHeader
          title="Pipelines"
          subtitle="Manage and monitor your data pipelines"
          action={
            <div className="flex items-center gap-3">

              {/* Refresh */}

              <button
                onClick={fetchPipelines}
                disabled={loading}
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-3
                  py-2
                  text-sm
                  hover:bg-slate-800
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  transition
                "
              >
                ↻ Refresh
              </button>

              {/* Create */}

              <button
                onClick={() => {
                  setError(null);
                  setCreateOpen(true);
                }}
                className="
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  hover:bg-blue-500
                  transition
                "
              >
                + Create Pipeline
              </button>

            </div>
          }
        />

        {/* Error */}

        {error && (
          <div
            className="
              mb-6
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* Metrics */}

        {!loading &&
          pipelines.length > 0 && (
            <div className="mb-6">
              <MetricsBar
                pipelines={pipelines}
              />
            </div>
          )}

        {/* Empty */}

        {!loading &&
          pipelines.length === 0 && (
            <EmptyState
              title="No Pipelines Found"
              description="Create your first pipeline to start processing data."
            />
          )}

        {/* Loading */}

        {loading && (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {[1, 2, 3, 4].map(
              (item) => (
                <LoadingSkeleton
                  key={item}
                />
              )
            )}
          </div>
        )}

        {/* Pipeline Cards */}

        {!loading &&
          pipelines.length > 0 && (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {pipelines.map(
                (pipeline) => (
                  <PipelineCard
                    key={pipeline.id}
                    pipeline={getPipelineWithDisplayStatus(
                      pipeline
                    )}
                    running={
                      runningPipelineId ===
                      pipeline.id
                    }
                    onRun={runPipeline}
                    onLogs={
                      handleViewLogs
                    }
                    onHistory={
                      handleViewHistory
                    }
                  />
                )
              )}
            </div>
          )}

        {/* Create Pipeline Dialog */}

        <CreatePipelineDialog
          isOpen={createOpen}
          onClose={() =>
            setCreateOpen(false)
          }
          onCreate={
            handleCreatePipeline
          }
          creating={
            creatingPipeline
          }
        />

        {/* Logs */}

        <PipelineLogsModal
          isOpen={logsOpen}
          onClose={() =>
            setLogsOpen(false)
          }
          logsData={logsData}
        />

        {/* History */}

        <PipelineRunHistoryModal
          isOpen={historyOpen}
          onClose={() =>
            setHistoryOpen(false)
          }
          pipelineId={
            selectedPipelineId
          }
        />

      </div>
    </div>
  );
}