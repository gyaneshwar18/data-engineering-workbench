import {
  Play,
  FileText,
  History,
  Loader2,
  Database,
  Globe,
  FileSpreadsheet,
  Clock3,
} from "lucide-react";

import StatusBadge from "../ui/StatusBadge";

export default function PipelineCard({
  pipeline,
  onRun,
  onLogs,
  onHistory,
  running,
}) {
  const source = pipeline.source?.toLowerCase();

  const getSourceIcon = () => {
    if (source === "api") {
      return <Globe size={21} />;
    }

    if (source === "csv") {
      return <FileSpreadsheet size={21} />;
    }

    return <Database size={21} />;
  };

  const getSourceLabel = () => {
    if (source === "api") return "API";
    if (source === "csv") return "CSV";

    return pipeline.source || "Unknown";
  };

  const formatLastRun = () => {
    if (!pipeline.last_run) {
      return "Never Run";
    }

    return new Date(
      pipeline.last_run
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isScheduled =
    pipeline.is_active &&
    pipeline.schedule_type;

  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        transition-all
        duration-300

        ${
          running
            ? `
              border-blue-500/50
              bg-slate-900
              shadow-[0_0_30px_rgba(59,130,246,0.12)]
            `
            : `
              border-slate-800
              bg-slate-900/90
              hover:border-slate-700
              hover:bg-slate-900
              hover:-translate-y-0.5
              hover:shadow-lg
            `
        }
      `}
    >
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-4">

          {/* Source Icon */}

          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              border

              ${
                source === "api"
                  ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  : source === "csv"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-slate-700 bg-slate-800 text-slate-400"
              }
            `}
          >
            {getSourceIcon()}
          </div>

          {/* Name */}

          <div className="min-w-0">

            <h2 className="truncate text-lg font-semibold text-white">
              {pipeline.name}
            </h2>

            
          </div>

        </div>

        {/* Status */}

        <div className="shrink-0">
          <StatusBadge
            status={pipeline.status}
          />
        </div>

      </div>

      {/* DIVIDER */}

      <div className="my-5 border-t border-slate-800" />

      {/* PIPELINE DETAILS */}

      <div className="grid grid-cols-2 gap-6">

        {/* SOURCE */}

        <div className="min-w-0">

          <p
            className="
              mb-2
              text-[10px]
              font-medium
              uppercase
              tracking-widest
              text-slate-500
            "
          >
            Source
          </p>

          <p className="truncate text-sm text-slate-200">
            {source === "api"
              ? "API Source"
              : source === "csv"
              ? "CSV File"
              : pipeline.source || "-"}
          </p>

        </div>

        {/* DESTINATION */}

        <div className="min-w-0">

          <p
            className="
              mb-2
              text-[10px]
              font-medium
              uppercase
              tracking-widest
              text-slate-500
            "
          >
            Destination
          </p>

          <p className="truncate font-mono text-sm text-slate-200">
            {pipeline.destination}
          </p>

        </div>

        {/* SCHEDULE */}

        <div>

          <p
            className="
              mb-2
              text-[10px]
              font-medium
              uppercase
              tracking-widest
              text-slate-500
            "
          >
            Schedule
          </p>

          {isScheduled ? (
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Clock3
                size={14}
                className="text-blue-400"
              />

              <span>
                {pipeline.schedule_type}
              </span>

              <span className="text-xs text-emerald-400">
                • Active
              </span>
            </div>
          ) : (
            <span className="text-sm text-slate-400">
              Manual
            </span>
          )}

        </div>

        {/* LAST RUN */}

        <div>

          <p
            className="
              mb-2
              text-[10px]
              font-medium
              uppercase
              tracking-widest
              text-slate-500
            "
          >
            Last Run
          </p>

          <p className="text-sm text-slate-300">
            {formatLastRun()}
          </p>

        </div>

      </div>

      {/* ACTIONS */}

      <div className="mt-6 grid grid-cols-3 gap-3">

        {/* RUN */}

        <button
          onClick={() =>
            onRun(pipeline.id)
          }
          disabled={running}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl

            border
            border-blue-500/20

            bg-blue-500/10

            text-sm
            font-medium
            text-blue-300

            transition-all

            hover:bg-blue-500/15

            disabled:cursor-not-allowed
            disabled:opacity-60
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

          {running
            ? "Running..."
            : "Run"}
        </button>

        {/* LOGS */}

        <button
          onClick={() =>
            onLogs(pipeline.id)
          }
          disabled={running}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl

            border
            border-amber-500/20

            bg-amber-500/10

            text-sm
            font-medium
            text-amber-300

            transition-all

            hover:bg-amber-500/15

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <FileText size={16} />

          Logs
        </button>

        {/* HISTORY */}

        <button
          onClick={() =>
            onHistory(pipeline.id)
          }
          disabled={running}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl

            border
            border-purple-500/20

            bg-purple-500/10

            text-sm
            font-medium
            text-purple-300

            transition-all

            hover:bg-purple-500/15

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <History size={16} />

          History
        </button>

      </div>

    </div>
  );
}