import React, { useEffect, useState } from "react";
import { getPipelineRuns, getRunLogs } from "../api/pipelineApi";

export default function PipelineRunHistory({ pipelineId }) {

  const [runs, setRuns] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState(null);

  useEffect(() => {
    fetchRuns();
  }, []);

  const fetchRuns = async () => {
    try {
      const data = await getPipelineRuns(pipelineId);
      setRuns(data);
    } catch (err) {
      console.error("Run history error:", err);
    }
  };

  const handleViewLogs = async (runId) => {
    try {
      const data = await getRunLogs(runId);
      setSelectedLogs(data);
    } catch (err) {
      console.error("Run logs error:", err);
    }
  };

  return (
    <div className="mt-4 bg-gray-900 p-4 rounded">

      <h3 className="text-lg font-semibold mb-3">
        Run History
      </h3>

      <table className="w-full text-sm">

        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="py-2">Run ID</th>
            <th>Status</th>
            <th>Started</th>
            <th>Finished</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {runs.map((run) => (
            <tr
              key={run.id}
              className="border-b border-gray-800"
            >
              <td className="py-2">{run.id}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    run.status === "success"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {run.status}
                </span>
              </td>

              <td>
                {new Date(run.started_at).toLocaleString()}
              </td>

              <td>
                {new Date(run.finished_at).toLocaleString()}
              </td>

              <td>
                <button
                  onClick={() => handleViewLogs(run.id)}
                  className="bg-blue-600 px-2 py-1 rounded text-xs cursor-pointer"
                >
                  View Logs
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {selectedLogs && (
        <div className="mt-4 bg-black p-3 rounded text-green-400 text-xs overflow-auto max-h-75">
          <pre>{selectedLogs.logs}</pre>
        </div>
      )}

    </div>
  );
}