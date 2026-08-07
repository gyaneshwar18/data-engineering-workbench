import {
  Play,
  FileText,
  History,
  Loader2,
} from "lucide-react";

import StatusBadge from "../ui/StatusBadge";

export default function PipelineCard({
  pipeline,
  onRun,
  onLogs,
  onHistory,
  running,
}) {
  const getIcon = () => {
    if (pipeline.name.toLowerCase().includes("api")) return "🌐";
    if (pipeline.name.toLowerCase().includes("csv")) return "📊";
    return "🗄️";
  };

  return (
    <div
      className={`
        rounded-2xl
        p-5
        transition-all
        duration-300

        ${
          running
            ? "bg-slate-900 border border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            : "bg-slate-900/90 border border-slate-800 hover:border-blue-500/30 hover:-translate-y-0.5 hover:shadow-lg"
        }
      `}
    >
      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div
            className={`
              h-12
              w-12
              rounded-xl
              flex
              items-center
              justify-center
              text-2xl
              transition-all

              ${
                running
                  ? "bg-blue-500/15"
                  : "bg-slate-800"
              }
            `}
          >
            {getIcon()}
          </div>

          <div>

            <h2 className="text-xl font-semibold text-white">
              {pipeline.name}
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              {pipeline.source} → {pipeline.destination}
            </p>

          </div>

        </div>

        <button
          disabled={running}
          className="
            text-slate-500
            hover:text-white
            disabled:opacity-40
            disabled:cursor-not-allowed
            text-lg
            transition
          "
        >
          ⋮
        </button>

      </div>

      <div className="border-t border-slate-800 my-5"></div>

      {/* Status */}

      <div className="grid grid-cols-2 gap-6">

        <div>

          <p
            className="
              text-[10px]
              uppercase
              tracking-widest
              text-slate-500
              mb-2
            "
          >
            Status
          </p>

          <StatusBadge status={pipeline.status} />

        </div>

        <div>

          <p
            className="
              text-[10px]
              uppercase
              tracking-widest
              text-slate-500
              mb-2
            "
          >
            Last Run
          </p>

          <p className="text-sm text-slate-300">
            {pipeline.last_run
              ? new Date(
                  pipeline.last_run
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Never Run"}
          </p>

        </div>

      </div>

      {/* Actions */}

      <div className="grid grid-cols-3 gap-3 mt-6">

        <button
          onClick={() => onRun(pipeline.id)}
          disabled={running}
          className="
            h-12
            rounded-xl
            cursor-pointer
            disabled:cursor-not-allowed
            disabled:opacity-70

            bg-blue-500/10
            border border-blue-500/20
            text-blue-300

            hover:bg-blue-500/15

            text-base
            font-medium

            transition-all
            duration-200

            flex
            items-center
            justify-center
            gap-2
          "
        >
          {running ? (
            <Loader2
              size={16}
              className="animate-spin"
            />
          ) : (
            <Play size={16} />
          )}

          {running ? "Running..." : "Run"}
        </button>

        <button
          onClick={() => onLogs(pipeline.id)}
          disabled={running}
          className="
            h-12
            rounded-xl
            cursor-pointer
            disabled:cursor-not-allowed
            disabled:opacity-70

            bg-amber-500/10
            border border-amber-500/20
            text-amber-300

            hover:bg-amber-500/15

            text-base
            font-medium

            transition-all
            duration-200

            flex
            items-center
            justify-center
            gap-2
          "
        >
          <FileText size={16} />
          Logs
        </button>

        <button
          onClick={() => onHistory(pipeline.id)}
          disabled={running}
          className="
            h-12
            rounded-xl
            cursor-pointer
            disabled:cursor-not-allowed
            disabled:opacity-70

            bg-purple-500/10
            border border-purple-500/20
            text-purple-300

            hover:bg-purple-500/15

            text-base
            font-medium

            transition-all
            duration-200

            flex
            items-center
            justify-center
            gap-2
          "
        >
          <History size={16} />
          History
        </button>

      </div>

    </div>
  );
}