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
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1
              rounded-full
              border
              border-green-500/20
              bg-green-500/10
              px-2
              py-1
              text-[10px]
              font-medium
              text-green-400

              sm:px-3
              sm:text-xs
            "
          >
            <CheckCircle2
              size={13}
              className="shrink-0"
            />
            SUCCESS
          </span>
        );

      case "failed":
        return (
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1
              rounded-full
              border
              border-red-500/20
              bg-red-500/10
              px-2
              py-1
              text-[10px]
              font-medium
              text-red-400

              sm:px-3
              sm:text-xs
            "
          >
            <XCircle
              size={13}
              className="shrink-0"
            />
            FAILED
          </span>
        );

      case "running":
        return (
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1
              rounded-full
              border
              border-yellow-500/20
              bg-yellow-500/10
              px-2
              py-1
              text-[10px]
              font-medium
              text-yellow-400

              sm:px-3
              sm:text-xs
            "
          >
            <LoaderCircle
              size={13}
              className="shrink-0 animate-spin"
            />
            RUNNING
          </span>
        );

      default:
        return (
          <span
            className="
              inline-flex
              shrink-0
              rounded-full
              bg-slate-700
              px-2
              py-1
              text-[10px]
              text-slate-300

              sm:px-3
              sm:text-xs
            "
          >
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
        bg-black/60
        p-2
        backdrop-blur-md

        sm:p-4
      "
    >
      <div
        className="
          flex
          h-[94vh]
          w-full
          max-w-5xl
          min-w-0
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-slate-700/70
          bg-[#0B1120]
          shadow-[0_25px_80px_rgba(0,0,0,0.75)]

          sm:h-[88vh]
          sm:rounded-2xl
        "
      >
        {/* Header */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-3
            border-b
            border-slate-800
            px-3.5
            py-3.5

            sm:px-5
            sm:py-4

            md:px-6
            md:py-5
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5

              sm:gap-3.5
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-purple-500/20
                bg-purple-500/10

                sm:h-11
                sm:w-11
                sm:rounded-xl
              "
            >
              <History
                className="text-purple-400"
                size={18}
              />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-sm
                  font-semibold
                  leading-5
                  text-white

                  sm:text-lg
                  md:text-xl
                "
              >
                Pipeline Run History
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  leading-4
                  text-slate-400

                  sm:text-xs
                "
              >
                Previous executions of this pipeline
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close pipeline run history"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition-colors
              duration-150
              hover:bg-slate-800
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500/30

              sm:h-10
              sm:w-10
              sm:rounded-xl
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
          "
        >
          {/* Run History Table */}

          <div
            className="
              max-h-[340px]
              overflow-auto

              sm:max-h-[360px]
            "
          >
            {runs.length === 0 ? (
              <div
                className="
                  flex
                  min-h-[220px]
                  items-center
                  justify-center
                  px-4
                  py-16
                  text-center
                  text-xs
                  text-slate-500

                  sm:text-sm
                "
              >
                No pipeline runs available.
              </div>
            ) : (
              <div className="min-w-full overflow-x-auto">
                <table
                  className="
                    w-full
                    min-w-[680px]
                    border-collapse
                  "
                >
                  <thead
                    className="
                      sticky
                      top-0
                      z-10
                      border-b
                      border-slate-800
                      bg-[#0B1120]
                    "
                  >
                    <tr
                      className="
                        text-left
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.12em]
                        text-slate-500

                        sm:text-xs
                        sm:tracking-wider
                      "
                    >
                      <th className="px-3 py-3 sm:px-6 sm:py-4">
                        Run
                      </th>

                      <th className="px-3 py-3 sm:px-4 sm:py-4">
                        Status
                      </th>

                      <th className="px-3 py-3 sm:px-4 sm:py-4">
                        Started
                      </th>

                      <th className="px-3 py-3 sm:px-4 sm:py-4">
                        Finished
                      </th>

                      <th className="px-3 py-3 text-center sm:px-4 sm:py-4">
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
                          transition-colors
                          hover:bg-slate-900/60
                        "
                      >
                        <td
                          className="
                            px-3
                            py-3
                            text-xs
                            font-medium
                            text-white

                            sm:px-6
                            sm:py-4
                            sm:text-sm
                          "
                        >
                          #{run.id}
                        </td>

                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <StatusBadge
                            status={run.status}
                          />
                        </td>

                        <td
                          className="
                            whitespace-nowrap
                            px-3
                            py-3
                            text-[11px]
                            text-slate-300

                            sm:px-4
                            sm:py-4
                            sm:text-sm
                          "
                        >
                          {run.started_at
                            ? new Date(
                                run.started_at
                              ).toLocaleString()
                            : "-"}
                        </td>

                        <td
                          className="
                            whitespace-nowrap
                            px-3
                            py-3
                            text-[11px]
                            text-slate-300

                            sm:px-4
                            sm:py-4
                            sm:text-sm
                          "
                        >
                          {run.finished_at
                            ? new Date(
                                run.finished_at
                              ).toLocaleString()
                            : "-"}
                        </td>

                        <td className="px-3 py-3 text-center sm:px-4 sm:py-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleViewLogs(run.id)
                            }
                            className="
                              inline-flex
                              h-8
                              items-center
                              gap-1.5
                              rounded-lg
                              border
                              border-slate-700
                              px-2.5
                              text-[11px]
                              font-medium
                              text-slate-300
                              transition-colors
                              duration-150
                              hover:bg-slate-800
                              hover:text-white
                              focus:outline-none
                              focus:ring-2
                              focus:ring-purple-500/30

                              sm:h-9
                              sm:gap-2
                              sm:px-3
                              sm:text-sm
                            "
                          >
                            <FileText
                              size={14}
                              className="shrink-0"
                            />

                            Logs
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Selected Logs */}

          {selectedLogs && (
            <div
              className="
                border-t
                border-slate-800
                px-3.5
                py-4

                sm:px-5
                sm:py-5

                md:px-6
                md:py-6
              "
            >
              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                  gap-3

                  sm:mb-4
                "
              >
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-white

                    sm:text-base
                  "
                >
                  Execution Logs
                </h3>
              </div>

              <div
                className="
                  min-w-0
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-800
                  bg-black
                "
              >
                {/* Terminal Header */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    border-b
                    border-slate-800
                    px-3.5
                    py-3

                    sm:px-4
                    sm:py-3
                  "
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3" />
                </div>

                {/* Logs */}

                <div
                  className="
                    h-[190px]
                    overflow-auto
                    p-3.5

                    sm:h-[220px]
                    sm:p-5
                  "
                >
                  <pre
                    className="
                      whitespace-pre-wrap
                      break-words
                      font-mono
                      text-[11px]
                      leading-5
                      text-emerald-400

                      sm:text-[13px]
                      sm:leading-6
                    "
                  >
                    {selectedLogs.logs ||
                      "No logs available"}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}