import { useEffect, useState } from "react";
import axios from "axios";

import { getPipelineLogs } from "../api/pipelineApi";

import PipelineCard from "../components/PipelineCard";
import PipelineLogsModal from "../components/PipelineLogsModal";
import PipelineRunHistoryModal from "../components/PipelineRunHistoryModal";

import MetricsBar from "../components/ui/MetricsBar";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";

export default function Pipelines() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [runningPipelineId, setRunningPipelineId] = useState(null);

  const [logsOpen, setLogsOpen] = useState(false);
  const [logsData, setLogsData] = useState(null);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedPipelineId, setSelectedPipelineId] = useState(null);

  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchPipelines();
  }, []);

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API}/pipelines`);

      setPipelines(res.data);
    } catch (err) {
      console.error(err);

      setError("Unable to load pipelines.");
    } finally {
      setLoading(false);
    }
  };

  const runPipeline = async (pipelineId) => {
    try {
      setRunningPipelineId(pipelineId);

      await axios.post(`${API}/pipelines/run/${pipelineId}`);

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

  const handleViewLogs = async (pipelineId) => {
    try {
      const data = await getPipelineLogs(pipelineId);

      setLogsData(data);
      setLogsOpen(true);
    } catch (error) {
      console.error(error);

      setError("Unable to load pipeline logs.");
    }
  };

  const handleViewHistory = (pipelineId) => {
    setSelectedPipelineId(pipelineId);
    setHistoryOpen(true);
  };

  const getPipelineWithDisplayStatus = (pipeline) => {
    if (runningPipelineId === pipeline.id) {
      return {
        ...pipeline,
        status: "running",
      };
    }

    return pipeline;
  };

  return (
    <div className="px-6 py-5 text-white">

      <div className="max-w-[1400px] mx-auto">

        <PageHeader
          title="Pipelines"
          subtitle="Manage and monitor your data pipelines"
          action={
            <button
              onClick={fetchPipelines}
              disabled={loading}
              className="
                border
                border-slate-700
                px-3
                py-2
                rounded-xl
                hover:bg-slate-800
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "
            >
              ↻ Refresh
            </button>
          }
        />

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
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {!loading && pipelines.length > 0 && (
          <div className="mb-6">
            <MetricsBar pipelines={pipelines} />
          </div>
        )}

        {!loading && pipelines.length === 0 && (
          <EmptyState
            title="No Pipelines Found"
            description="Create your first pipeline to start processing data."
          />
        )}

        {loading && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((item) => (
              <LoadingSkeleton key={item} />
            ))}
          </div>
        )}

        {!loading && pipelines.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {pipelines.map((pipeline) => (
              <PipelineCard
                key={pipeline.id}
                pipeline={getPipelineWithDisplayStatus(pipeline)}
                running={runningPipelineId === pipeline.id}
                onRun={runPipeline}
                onLogs={handleViewLogs}
                onHistory={handleViewHistory}
              />
            ))}
          </div>
        )}

        <PipelineLogsModal
          isOpen={logsOpen}
          onClose={() => setLogsOpen(false)}
          logsData={logsData}
        />

        <PipelineRunHistoryModal
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
          pipelineId={selectedPipelineId}
        />

      </div>

    </div>
  );
}