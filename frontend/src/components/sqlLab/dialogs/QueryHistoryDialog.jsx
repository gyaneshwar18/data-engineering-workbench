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
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/70
        p-2
        backdrop-blur-sm

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
          border-slate-700
          bg-slate-900
          shadow-2xl

          sm:h-[88vh]
          sm:rounded-2xl
        "
      >
        {/* ================================================== */}
        {/* HEADER                                             */}
        {/* ================================================== */}

        <div
          className="
            flex
            min-w-0
            shrink-0
            items-center
            justify-between
            gap-3

            border-b
            border-slate-700

            px-3.5
            py-3

            sm:px-6
            sm:py-5
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5

              sm:gap-3
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center

                rounded-lg
                border
                border-cyan-500/20
                bg-cyan-500/10

                sm:h-12
                sm:w-12
                sm:rounded-xl
              "
            >
              <History
                className="
                  h-4
                  w-4
                  text-cyan-400

                  sm:h-6
                  sm:w-6
                "
              />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-white

                  sm:text-lg
                "
              >
                Query History
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-slate-400

                  sm:mt-1
                  sm:text-sm
                "
              >
                Review and rerun previously executed SQL queries.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close query history"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center

              rounded-lg
              text-slate-400

              transition-colors

              hover:bg-slate-800
              hover:text-white

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/30

              sm:h-9
              sm:w-9
            "
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* ================================================== */}
        {/* BODY                                               */}
        {/* ================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden

            p-3

            sm:p-6
          "
        >
          {history.length === 0 ? (
            <div
              className="
                flex
                min-h-full
                flex-col
                items-center
                justify-center
                px-4
                text-center
              "
            >
              <History
                className="
                  mb-4
                  h-10
                  w-10
                  text-slate-600

                  sm:mb-5
                  sm:h-14
                  sm:w-14
                "
              />

              <h3
                className="
                  text-base
                  font-semibold
                  text-slate-300

                  sm:text-lg
                "
              >
                No Query History
              </h3>

              <p
                className="
                  mt-1.5
                  text-xs
                  text-slate-500

                  sm:mt-2
                  sm:text-sm
                "
              >
                Your executed queries will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-5">
              {history.map((item) => {
                const isSuccess = item.status === "success";

                return (
                  <div
                    key={item.id}
                    className="
                      min-w-0
                      overflow-hidden

                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-800/40

                      p-3

                      transition-colors
                      hover:border-cyan-500/40

                      sm:rounded-2xl
                      sm:p-5
                    "
                  >
                    {/* SQL */}

                    <div
                      className="
                        min-w-0
                        overflow-hidden
                        rounded-lg
                        bg-slate-950

                        sm:rounded-xl
                      "
                    >
                      <pre
                        className="
                          max-w-full
                          overflow-x-auto

                          p-3

                          text-[11px]
                          leading-5
                          text-emerald-400

                          sm:p-4
                          sm:text-sm
                          sm:leading-6
                        "
                      >
                        <code>{item.query}</code>
                      </pre>
                    </div>

                    {/* Metadata + Action */}

                    <div
                      className="
                        mt-3
                        flex
                        min-w-0
                        flex-col
                        gap-3

                        sm:mt-5
                        sm:flex-row
                        sm:flex-wrap
                        sm:items-center
                        sm:justify-between
                        sm:gap-4
                      "
                    >
                      {/* Metadata */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-wrap
                          items-center
                          gap-x-4
                          gap-y-2

                          text-[10px]
                          text-slate-500

                          sm:gap-5
                          sm:text-xs
                        "
                      >
                        {/* Date */}

                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

                          <span>
                            {item.created_at
                              ? new Date(
                                  item.created_at
                                ).toLocaleDateString()
                              : "--"}
                          </span>
                        </div>

                        {/* Execution Time */}

                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

                          <span>
                            {item.execution_time !== undefined &&
                            item.execution_time !== null
                              ? `${Number(
                                  item.execution_time
                                ).toFixed(3)}s`
                              : "--"}
                          </span>
                        </div>

                        {/* Status */}

                        <div
                          className={`flex items-center gap-1.5 ${
                            isSuccess
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {isSuccess ? (
                            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}

                          <span>
                            {isSuccess ? "Success" : "Failed"}
                          </span>
                        </div>
                      </div>

                      {/* Run Again */}

                      <button
                        type="button"
                        onClick={() => onRunAgain(item.query)}
                        className="
                          inline-flex
                          min-h-9
                          w-full
                          items-center
                          justify-center
                          gap-2

                          rounded-lg
                          bg-cyan-500

                          px-3
                          py-2

                          text-xs
                          font-semibold
                          text-slate-950

                          transition-colors

                          hover:bg-cyan-400

                          focus:outline-none
                          focus:ring-2
                          focus:ring-cyan-500/30

                          sm:w-auto
                          sm:rounded-xl
                          sm:px-4
                          sm:text-sm
                        "
                      >
                        <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Run Again
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================================================== */}
        {/* FOOTER                                             */}
        {/* ================================================== */}

        <div
          className="
            flex
            shrink-0
            justify-end

            border-t
            border-slate-700

            px-3
            py-2.5

            sm:px-6
            sm:py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border
              border-slate-700
              bg-slate-800

              px-4
              py-2

              text-xs
              font-medium
              text-slate-300

              transition-colors

              hover:bg-slate-700
              hover:text-white

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/20

              sm:rounded-xl
              sm:px-5
              sm:py-2.5
              sm:text-sm
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryHistoryDialog;