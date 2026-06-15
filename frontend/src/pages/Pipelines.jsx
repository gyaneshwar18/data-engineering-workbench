import { useEffect, useState } from "react";
import axios from "axios";
import { getPipelineLogs } from "../api/pipelineApi";
import PipelineLogsModal from "../components/PipelineLogsModal";
import PipelineRunHistory from "../components/PipelineRunHistory";
import PipelineRunHistoryModal from "../components/PipelineRunHistoryModal";

import StatusBadge from "../components/ui/StatusBadge";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
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

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

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

      setError(
        "Unable to load pipelines."
      );

    } finally {

      setLoading(false);

    }
  };

  const runPipeline = async (id) => {

    try {

      setRunningPipelineId(id);

      setMessage(null);
      setError(null);

      await axios.post(
        `${API}/pipelines/run/${id}`
      );

      setMessage(
        "✅ Pipeline executed successfully"
      );

      await fetchPipelines();
      setRefreshKey(prev => prev + 1);

    } catch (err) {

      console.error(err);

      setError(
        err?.response?.data?.detail ||
        "❌ Pipeline execution failed"
      );

    } finally {

      setRunningPipelineId(null);

    }
  };

  useEffect(() => {

    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);

  }, [message]);



  const handleViewLogs = async (pipelineId) => {
    try {
      const data = await getPipelineLogs(pipelineId);
      setLogsData(data);
      setLogsOpen(true);
    } catch (error) {
      console.error("Error fetching logs", error);
    }
  };

  const handleViewHistory = (pipelineId) => {
    setSelectedPipelineId(pipelineId);
    setHistoryOpen(true);
  };

  return (
    <div className="p-6 text-white">

      <PageHeader
        title="Pipelines"
        subtitle="Manage and monitor data pipelines"
        action={
          <button
            onClick={fetchPipelines}
            disabled={loading}
            className="
        bg-blue-600
        hover:bg-blue-700
        px-4
        py-2
        rounded-lg
      "
          >
            Refresh
          </button>
        }
      />
      {message && (
        <div className="mb-4 bg-green-600 text-white p-3 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-600 text-white p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={fetchPipelines}
        disabled={loading}
        className="mb-4 bg-blue-600 px-4 py-2 rounded disabled:bg-gray-600"
      >
        {loading
          ? "Refreshing..."
          : "🔄 Refresh"}
      </button>

      {!loading && pipelines.length === 0 && (
        <EmptyState
          title="No Pipelines Found"
          description="Create your first pipeline to start processing data."
        />
      )}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {[1, 2, 3, 4].map((item) => (
            <LoadingSkeleton key={item} />
          ))}

        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {pipelines.map((p) => (
          <Card className="min-h-55">

            <h2 className="text-xl font-semibold mb-2">
              {p.name}
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              {p.source} → {p.destination}
            </p>

            <div className="space-y-3">
              <div className="mt-4 space-y-3">

                <div className="flex justify-between">

                  <span className="text-slate-400 text-sm">
                    Status
                  </span>

                  <StatusBadge status={p.status} />

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400 text-sm">
                    Last Run
                  </span>

                  <span className="text-sm text-slate-300">
                    {p.last_run
                      ? new Date(p.last_run).toLocaleDateString()
                      : "Never"}
                  </span>

                </div>

              </div>

              <div className="grid grid-cols-3 gap-2 pt-4">

                <button
                  onClick={() => runPipeline(p.id)}
                  disabled={runningPipelineId === p.id}
                  className="
          bg-green-600
          hover:bg-green-700
          rounded-lg
          py-2
          text-sm
          transition
        "
                >
                  {runningPipelineId === p.id
                    ? "Running..."
                    : "Run"}
                </button>

                <button
                  onClick={() => handleViewLogs(p.id)}
                  className="
          bg-blue-600
          hover:bg-blue-700
          rounded-lg
          py-2
          text-sm
          transition
        "
                >
                  Logs
                </button>

                <button
                  onClick={() => handleViewHistory(p.id)}
                  className="
          bg-purple-600
          hover:bg-purple-700
          rounded-lg
          py-2
          text-sm
          transition
        "
                >
                  History
                </button>

              </div>

            </div>

          </Card>
        ))}

      </div>

      {/* ✅ MODAL (YOU FORGOT THIS — VERY IMPORTANT) */}
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
  );
}