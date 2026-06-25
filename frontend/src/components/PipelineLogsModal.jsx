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

        p-6

        bg-black/60
        backdrop-blur-md
      "
    >
      <div
        className="
          w-full
          max-w-5xl
          max-h-[88vh]

          rounded-3xl

          bg-[#0B1120]

          border
          border-slate-700/70

          ring-1
          ring-slate-800/60

          shadow-[0_30px_90px_rgba(0,0,0,0.75)]

          overflow-hidden

          animate-in
          fade-in
        "
      >
        {/* Header */}

        <div
          className="
            sticky
            top-0
            z-10

            flex
            items-center
            justify-between

            px-6
            py-5

            bg-[#0B1120]

            border-b
            border-slate-800
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                h-14
                w-14

                rounded-2xl

                bg-blue-500/10

                flex
                items-center
                justify-center
              "
            >
              <FileText
                className="text-blue-400"
                size={28}
              />
            </div>

            <div>

              <h2 className="text-lg font-semibold  text-white">
                Pipeline Logs
              </h2>

              <p className="text-slate-400 text-sm">
                Execution details and runtime logs
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              h-11
              w-11

              rounded-xl

              hover:bg-slate-800

              transition

              flex
              items-center
              justify-center
            "
          >
            <X
              size={22}
              className="text-slate-400"
            />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 overflow-auto max-h-[calc(88vh-95px)]">

          {/* Metrics */}

          <div className="grid md:grid-cols-3 gap-5 mb-8">

            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">

              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                Status
              </p>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  px-4
                  py-2

                  bg-green-500/10

                  border
                  border-green-500/20
                "
              >
                <CheckCircle2
                  size={16}
                  className="text-green-400"
                />

                <span className="text-green-400 font-semibold">
                  {logsData?.status?.toUpperCase()}
                </span>
              </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">

              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                Started
              </p>

              <div className="flex items-center gap-2">

                <Clock3
                  size={16}
                  className="text-slate-400"
                />

                <span className="text-slate-200">
                  {logsData?.started_at || "-"}
                </span>

              </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">

              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                Finished
              </p>

              <div className="flex items-center gap-2">

                <Clock3
                  size={16}
                  className="text-slate-400"
                />

                <span className="text-slate-200">
                  {logsData?.finished_at || "-"}
                </span>

              </div>

            </div>

          </div>

          {/* Terminal Header */}

          <div className="flex justify-between items-center mb-5">

            <h3 className="text-lg font-semibold text-white">
              Terminal Output
            </h3>

            <button
              onClick={copyLogs}
              className="
                flex
                items-center
                gap-2

                rounded-xl

                border
                border-slate-700

                px-4
                py-2

                hover:bg-slate-800

                transition
              "
            >
              <Copy size={16} />
              Copy Logs
            </button>

          </div>

          {/* Terminal */}

          <div
            className="
              overflow-hidden

              rounded-2xl

              border
              border-slate-800

              bg-black
            "
          >
            {/* Window Bar */}

            <div
              className="
                flex
                items-center
                gap-3

                px-5
                py-4

                border-b
                border-slate-800
              "
            >
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>

            {/* Logs */}

            <div
              className="
                overflow-y-auto

                h-[340px]

                p-7

                font-mono
                text-[13px]
                leading-6

                text-emerald-400
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