import {
  History,
  Play,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";

const QueryHistoryDialog = ({
  open = false,
  history = [],
  onClose = () => {},
  onRunAgain = () => {},
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <History className="h-6 w-6 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Query History
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Review and rerun previously executed SQL queries.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {history.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <History className="mb-5 h-14 w-14 text-slate-600" />

              <h3 className="text-lg font-semibold text-slate-300">
                No Query History
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Your executed queries will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {history.map((item) => {
                const isSuccess = item.status === "success";

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 transition hover:border-cyan-500/40"
                  >
                    {/* SQL */}
                    <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-emerald-400">
                      <code>{item.query}</code>
                    </pre>

                    {/* Metadata + Action */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                      <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">

                        {/* Date */}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />

                          {item.created_at
                            ? new Date(
                                item.created_at
                              ).toLocaleDateString()
                            : "--"}
                        </div>

                        {/* Execution Time */}
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />

                          {item.execution_time !== undefined &&
                          item.execution_time !== null
                            ? `${Number(
                                item.execution_time
                              ).toFixed(3)}s`
                            : "--"}
                        </div>

                        {/* Status */}
                        <div
                          className={`flex items-center gap-2 ${
                            isSuccess
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {isSuccess ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}

                          {isSuccess
                            ? "Success"
                            : "Failed"}
                        </div>
                      </div>

                      {/* Run Again */}
                      <button
                        onClick={() =>
                          onRunAgain(item.query)
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        <Play className="h-4 w-4" />
                        Run Again
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-700 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryHistoryDialog;