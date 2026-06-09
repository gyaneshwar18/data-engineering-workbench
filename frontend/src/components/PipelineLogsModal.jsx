import React, { useEffect, useState } from "react";
import { getPipelineRuns, getRunLogs } from "../api/pipelineApi";

export default function PipelineRunHistoryModal({
  isOpen,
  onClose,
  pipelineId,
}) {
  const [runs, setRuns] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState(null);

  useEffect(() => {
    if (!isOpen || !pipelineId) return;

    const fetchRuns = async () => {
      try {
        const data = await getPipelineRuns(pipelineId);
        setRuns(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRuns();
  }, [isOpen, pipelineId]);

  const handleViewLogs = async (runId) => {
    try {
      const data = await getRunLogs(runId);
      setSelectedLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 text-white w-[90%] max-w-6xl rounded-xl p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Pipeline Run History
          </h2>

          <button
            onClick={onClose}
            className="text-red-400"
          >
            ✕
          </button>
        </div>

        <div className="overflow-auto max-h-[60vh]">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2">Run ID</th>
                <th>Status</th>
                <th>Started</th>
                <th>Finished</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {runs.map((run) => (
                <tr
                  key={run.id}
                  className="border-b border-slate-800"
                >
                  <td>{run.id}</td>

                  <td>{run.status}</td>

                  <td>
                    {new Date(run.started_at).toLocaleString()}
                  </td>

                  <td>
                    {new Date(run.finished_at).toLocaleString()}
                  </td>

                  <td>
                    <button
                      onClick={() => handleViewLogs(run.id)}
                      className="bg-blue-600 px-3 py-1 rounded"
                    >
                      Logs
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {selectedLogs && (
          <div className="mt-4 bg-black p-3 rounded max-h-62.5 overflow-auto text-green-400 text-xs">
            <pre>{selectedLogs.logs}</pre>
          </div>
        )}

      </div>

    </div>
  );
}