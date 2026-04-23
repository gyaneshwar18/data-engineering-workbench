import { useEffect, useState } from "react";
import axios from "axios";

export default function Pipelines() {

  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchPipelines();
  }, []);

  const fetchPipelines = async () => {
    try {
      const res = await axios.get(`${API}/pipelines`);
      setPipelines(res.data);
    } catch (err) {
      console.error("Error fetching pipelines:", err);
    }
  };

  const runPipeline = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${API}/pipelines/run/${id}`);
      await fetchPipelines(); // refresh after run
    } catch (err) {
      console.error("Run error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "bg-green-600";
      case "failed": return "bg-red-600";
      case "running": return "bg-yellow-500";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">
        🔄 Pipelines
      </h1>

      <button
        onClick={fetchPipelines}
        className="mb-4 bg-blue-600 px-4 py-2 rounded"
      >
        🔄 Refresh
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {pipelines.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-800"
          >

            {/* NAME */}
            <h2 className="text-lg font-semibold">
              {p.name}
            </h2>

            {/* FLOW */}
            <p className="text-gray-400 text-sm mt-1">
              {p.source} → {p.destination}
            </p>

            {/* STATUS */}
            <div className="mt-3 flex items-center justify-between">

              <span className={`px-3 py-1 rounded text-sm ${getStatusColor(p.status)}`}>
                {p.status}
              </span>

              <button
                onClick={() => runPipeline(p.id)}
                className="bg-green-600 px-3 py-1 rounded text-sm"
              >
                ▶ Run
              </button>

            </div>

            {/* LAST RUN */}
            {p.last_run && (
              <p className="text-xs text-gray-500 mt-2">
                Last Run: {new Date(p.last_run).toLocaleString()}
              </p>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}