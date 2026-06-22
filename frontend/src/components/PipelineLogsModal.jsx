import React from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  LoaderCircle,
  Copy,
  X,
} from "lucide-react";

const PipelineLogsModal = ({
  isOpen,
  onClose,
  logsData,
}) => {
  if (!isOpen) return null;

  const copyLogs = async () => {
    try {
      await navigator.clipboard.writeText(
        logsData?.logs || ""
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-medium">
            <CheckCircle2 size={14} />
            SUCCESS
          </span>
        );

      case "failed":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium">
            <XCircle size={14} />
            FAILED
          </span>
        );

      case "running":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-medium">
            <LoaderCircle
              size={14}
              className="animate-spin"
            />
            RUNNING
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs">
            UNKNOWN
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

              <FileText
                size={20}
                className="text-blue-400"
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold text-white">
                Pipeline Logs
              </h2>

              <p className="text-sm text-slate-400">
                Execution details and runtime logs
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="text-slate-400" />
          </button>

        </div>

        {/* Metadata */}

        <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-800">

          <div className="bg-slate-900 rounded-xl p-4">

            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
              Status
            </p>

            {getStatusBadge(logsData?.status)}

          </div>

          <div className="bg-slate-900 rounded-xl p-4">

            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
              Started
            </p>

            <p className="text-sm text-white break-words">
              {logsData?.started_at || "-"}
            </p>

          </div>

          <div className="bg-slate-900 rounded-xl p-4">

            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
              Finished
            </p>

            <p className="text-sm text-white break-words">
              {logsData?.finished_at || "-"}
            </p>

          </div>

        </div>

        {/* Log Viewer */}

        <div className="p-6">

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-white font-semibold">
              Terminal Output
            </h3>

            <button
              onClick={copyLogs}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition text-sm text-slate-300"
            >
              <Copy size={15} />
              Copy Logs
            </button>

          </div>

          <div className="bg-black rounded-xl border border-slate-800 overflow-hidden">

            <div className="flex gap-2 px-4 py-3 border-b border-slate-800">

              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>

            </div>

            <div className="h-[380px] overflow-auto p-5">

              {logsData?.logs ? (
                <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap leading-7">
                  {logsData.logs}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  No logs available.
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PipelineLogsModal;