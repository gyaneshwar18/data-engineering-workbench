import React from "react";
import {
  FileText,
  CheckCircle2,
  Clock3,
  Copy,
  X,
} from "lucide-react";

const PipelineLogsModal = ({
  isOpen,
  onClose,
  logsData,
}) => {
  if (!isOpen) return null;

  const copyLogs = () => {
    navigator.clipboard.writeText(logsData?.logs || "");
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
          shadow-[0_30px_90px_rgba(0,0,0,0.75)]

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
            bg-[#0B1120]
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
                border-blue-500/20
                bg-blue-500/10

                sm:h-11
                sm:w-11
                sm:rounded-xl

                md:h-12
                md:w-12
              "
            >
              <FileText
                className="text-blue-400"
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

                  sm:text-base
                  md:text-lg
                "
              >
                Pipeline Logs
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  leading-4
                  text-slate-400

                  sm:text-xs

                  md:text-sm
                "
              >
                Execution details and runtime logs
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close pipeline logs"
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
              focus:ring-blue-500/30

              sm:h-10
              sm:w-10
              sm:rounded-xl
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-3.5
            py-4

            sm:px-5
            sm:py-5

            md:px-6
            md:py-6
          "
        >
          {/* Metrics */}

          <div
            className="
              mb-5
              grid
              min-w-0
              grid-cols-1
              gap-3

              sm:gap-4

              md:mb-7
              md:grid-cols-3
              md:gap-5
            "
          >
            {/* Status */}

            <div
              className="
                min-w-0
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                p-3.5

                sm:p-4

                md:rounded-2xl
              "
            >
              <p
                className="
                  mb-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-slate-500

                  sm:mb-3
                  sm:text-xs
                  sm:tracking-wider
                "
              >
                Status
              </p>

              <div
                className="
                  inline-flex
                  max-w-full
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-green-500/20
                  bg-green-500/10
                  px-3
                  py-1.5

                  sm:gap-2
                  sm:px-4
                  sm:py-2
                "
              >
                <CheckCircle2
                  size={15}
                  className="shrink-0 text-green-400"
                />

                <span className="truncate text-xs font-semibold text-green-400 sm:text-sm">
                  {logsData?.status?.toUpperCase() || "-"}
                </span>
              </div>
            </div>

            {/* Started */}

            <div
              className="
                min-w-0
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                p-3.5

                sm:p-4

                md:rounded-2xl
                md:p-5
              "
            >
              <p
                className="
                  mb-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-slate-500

                  sm:mb-3
                  sm:text-xs
                  sm:tracking-wider
                "
              >
                Started
              </p>

              <div className="flex min-w-0 items-center gap-2">
                <Clock3
                  size={15}
                  className="shrink-0 text-slate-400"
                />

                <span
                  className="
                    min-w-0
                    truncate
                    text-xs
                    text-slate-200

                    sm:text-sm
                  "
                  title={logsData?.started_at || "-"}
                >
                  {logsData?.started_at || "-"}
                </span>
              </div>
            </div>

            {/* Finished */}

            <div
              className="
                min-w-0
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                p-3.5

                sm:p-4

                md:rounded-2xl
                md:p-5
              "
            >
              <p
                className="
                  mb-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-slate-500

                  sm:mb-3
                  sm:text-xs
                  sm:tracking-wider
                "
              >
                Finished
              </p>

              <div className="flex min-w-0 items-center gap-2">
                <Clock3
                  size={15}
                  className="shrink-0 text-slate-400"
                />

                <span
                  className="
                    min-w-0
                    truncate
                    text-xs
                    text-slate-200

                    sm:text-sm
                  "
                  title={logsData?.finished_at || "-"}
                >
                  {logsData?.finished_at || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Terminal Header */}

          <div
            className="
              mb-3
              flex
              min-w-0
              items-center
              justify-between
              gap-3

              sm:mb-4
            "
          >
            <h3
              className="
                truncate
                text-sm
                font-semibold
                text-white

                sm:text-base
                md:text-lg
              "
            >
              Terminal Output
            </h3>

            <button
              type="button"
              onClick={copyLogs}
              aria-label="Copy logs"
              title="Copy Logs"
              className="
                inline-flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-700
                text-slate-300
                transition-colors
                duration-150
                hover:bg-slate-800
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/30

                sm:h-auto
                sm:w-auto
                sm:rounded-xl
                sm:px-3
                sm:py-2
              "
            >
              <Copy size={15} />

              <span className="hidden text-xs font-medium sm:inline">
                Copy Logs
              </span>
            </button>
          </div>

          {/* Terminal */}

          <div
            className="
              min-w-0
              overflow-hidden
              rounded-xl
              border
              border-slate-800
              bg-black

              sm:rounded-2xl
            "
          >
            {/* Window Bar */}

            <div
              className="
                flex
                items-center
                gap-2
                border-b
                border-slate-800
                px-3.5
                py-3

                sm:gap-2.5
                sm:px-4
                sm:py-3.5

                md:px-5
                md:py-4
              "
            >
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 sm:h-3 sm:w-3" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3" />
            </div>

            {/* Logs */}

            <div
              className="
                h-[280px]
                overflow-auto
                p-4
                font-mono
                text-[11px]
                leading-5
                text-emerald-400

                sm:h-[320px]
                sm:p-5
                sm:text-xs
                sm:leading-6

                md:h-[340px]
                md:p-6
                md:text-[13px]
              "
            >
              <pre className="whitespace-pre-wrap break-words">
                {logsData?.logs || "No logs available"}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineLogsModal;