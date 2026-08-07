import React, { useEffect, useState } from "react";
import {
  History,
  FileText,
  X,
  CheckCircle2,
  XCircle,
  LoaderCircle,
} from "lucide-react";

import {
  getPipelineRuns,
  getRunLogs,
} from "../../api/pipelineApi";

export default function PipelineRunHistoryModal({
  isOpen,
  onClose,
  pipelineId,
}) {
  const [runs, setRuns] = useState([]);
  const [selectedLogs, setSelectedLogs] =
    useState(null);

  useEffect(() => {
    if (!isOpen || !pipelineId) return;

    const fetchRuns = async () => {
      try {
        const data =
          await getPipelineRuns(pipelineId);

        setRuns(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRuns();
  }, [isOpen, pipelineId]);

  const handleViewLogs = async (runId) => {
    try {
      const data =
        await getRunLogs(runId);

      setSelectedLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const StatusBadge = ({ status }) => {
    switch (status?.toLowerCase()) {
      case "success":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
            <CheckCircle2 size={14} />
            SUCCESS
          </span>
        );

      case "failed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
            <XCircle size={14} />
            FAILED
          </span>
        );

      case "running":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
            <LoaderCircle
              size={14}
              className="animate-spin"
            />
            RUNNING
          </span>
        );

      default:
        return (
          <span className="inline-flex rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
            UNKNOWN
          </span>
        );
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        p-5

        bg-black/60
        backdrop-blur-md
      "
    >
      <div
        className="
          w-full
          max-w-5xl
          max-h-[85vh]

          bg-[#0B1120]

          border
          border-slate-700/70

          rounded-2xl

          shadow-[0_25px_80px_rgba(0,0,0,0.75)]

          overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between

            px-6
            py-5

            border-b
            border-slate-800
          "
        >
          <div className="flex items-center gap-3">

            <div className="h-11 w-11 rounded-xl bg-purple-500/10 flex items-center justify-center">

              <History
                className="text-purple-400"
                size={22}
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold text-white">
                Pipeline Run History
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Previous executions of this pipeline
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-slate-800 flex items-center justify-center transition"
          >
            <X
              size={20}
              className="text-slate-400"
            />
          </button>
        </div>

        {/* Table */}

        <div className="overflow-auto max-h-[360px]">

          {runs.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              No pipeline runs available.
            </div>
          ) : (
            <table className="w-full">

              <thead className="sticky top-0 bg-[#0B1120] border-b border-slate-800">

                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">

                  <th className="px-6 py-4">
                    Run
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Started
                  </th>

                  <th>
                    Finished
                  </th>

                  <th className="text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {runs.map((run) => (

                  <tr
                    key={run.id}
                    className="
                      border-b
                      border-slate-800

                      hover:bg-slate-900/60

                      transition
                    "
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      #{run.id}
                    </td>

                    <td>
                      <StatusBadge
                        status={run.status}
                      />
                    </td>

                    <td className="text-sm text-slate-300">
                      {new Date(
                        run.started_at
                      ).toLocaleString()}
                    </td>

                    <td className="text-sm text-slate-300">
                      {new Date(
                        run.finished_at
                      ).toLocaleString()}
                    </td>

                    <td className="text-center">

                      <button
                        onClick={() =>
                          handleViewLogs(run.id)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2

                          rounded-lg

                          border
                          border-slate-700

                          px-3
                          py-2

                          text-sm

                          hover:bg-slate-800

                          transition
                        "
                      >
                        <FileText size={15} />
                        Logs
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}

        </div>

        {/* Terminal */}

        {selectedLogs && (

          <div className="p-6 border-t border-slate-800">

            <h3 className="text-base font-semibold mb-4">
              Execution Logs
            </h3>

            <div className="rounded-xl overflow-hidden border border-slate-800">

              <div className="flex gap-2 px-4 py-3 border-b border-slate-800 bg-black">

                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>

              </div>

              <div className="bg-black h-[220px] overflow-auto p-5">

                <pre className="text-[13px] leading-6 text-emerald-400 whitespace-pre-wrap font-mono">
                  {selectedLogs.logs}
                </pre>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}