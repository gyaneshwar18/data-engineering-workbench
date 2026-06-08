import { useEffect, useState } from "react";
import axios from "axios";
import { getPipelineLogs } from "../api/pipelineApi";
import PipelineLogsModal from "../components/PipelineLogsModal";
import PipelineRunHistory from "../components/PipelineRunHistory";

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

  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "bg-green-600";
      case "failed": return "bg-red-600";
      case "running": return "bg-yellow-500";
      default: return "bg-gray-600";
    }
  };

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

      <h1 className="text-2xl font-bold mb-6">
        🔄 Pipelines
      </h1>
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
        <div className="bg-gray-900 p-10 rounded-xl text-center">

          <h3 className="text-xl font-semibold mb-2">
            No Pipelines Found
          </h3>

          <p className="text-gray-400">
            Create your first pipeline to begin processing data.
          </p>

        </div>
      )}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse bg-gray-900 p-6 rounded-xl"
            >
              <div className="h-6 bg-gray-700 rounded mb-3"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          ))}

        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {pipelines.map((p) => (
          <div
            key={p.id}
            className="
                            bg-gray-900
                            border
                            border-gray-800
                            rounded-xl
                            p-5
                            flex
                            flex-col
                            h-full
                            min-h-50.5
                            shadow-lg
                            hover:border-blue-500
                            transition-all
                            duration-300
                            "
          >

            {/* NAME */}
            <h2 className="text-lg font-semibold">
              {p.name}
            </h2>

            {/* FLOW */}
            <p className="text-gray-400 text-sm mt-1">
              {p.source} → {p.destination}
            </p>

            {/* STATUS + ACTIONS */}
            <div className="mt-3 flex items-center justify-between">

              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>
                {p.status}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => runPipeline(p.id)}
                  disabled={runningPipelineId === p.id}
                  className={`px-3 py-1 rounded text-sm ${runningPipelineId === p.id
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {runningPipelineId === p.id
                    ? "Running..."
                    : "▶ Run"}
                </button>

                <button
                  onClick={() => handleViewLogs(p.id)}
                  className="bg-blue-600 px-2 py-1 rounded text-sm"
                >
                  View Logs
                </button>
              </div>

            </div>

            {/* LAST RUN */}
            {p.last_run && (
              <p className="text-xs text-gray-500 mt-2">
                Last Run: {new Date(p.last_run).toLocaleString()}
              </p>
            )}
            <button
              className="
                        bg-purple-600
                        hover:bg-purple-700
                        px-3
                        py-1
                        rounded
                        text-sm
                        transition
                      "
            >
              View Run History
            </button>

          </div>
        ))}

      </div>

      {/* ✅ MODAL (YOU FORGOT THIS — VERY IMPORTANT) */}
      <PipelineLogsModal
        isOpen={logsOpen}
        onClose={() => setLogsOpen(false)}
        logsData={logsData}
      />

    </div>
  );
}