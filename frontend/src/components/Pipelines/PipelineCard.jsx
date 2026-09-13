import {
  Play,
  FileText,
  History,
  Loader2,
  Clock3,
} from "lucide-react";

import apiIcon from "../../assets/datasets/api.svg";
import csvIcon from "../../assets/datasets/csv.svg";
import tableIcon from "../../assets/datasets/table.svg";

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
    switch (pipeline.source?.toLowerCase()) {
      case "api":
        return apiIcon;

      case "csv":
        return csvIcon;

      default:
        return tableIcon;
    }
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
        w-full
        min-w-0
        rounded-xl
        border
        p-4
        transition-all
        duration-300

        sm:rounded-2xl
        sm:p-5

        ${running
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
      {/* ============================================================
          HEADER
      ============================================================ */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-3
        "
      >
        {/* ----------------------------------------------------------
            SOURCE + NAME
        ---------------------------------------------------------- */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3

            sm:gap-3.5
          "
        >
          {/* Source Icon */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-slate-700
              bg-slate-800

              sm:h-11
              sm:w-11
              sm:rounded-xl
            "
          >
            <img
              src={getSourceIcon()}
              alt={`${getSourceLabel()} source`}
              className={`
                block
                object-contain

                ${source === "api"
                  ? "h-7 w-7 sm:h-8 sm:w-8"
                  : "h-6 w-6 sm:h-7 sm:w-7"
                }
              `}
            />
          </div>

          {/* Pipeline Name */}

          <div className="min-w-0 flex-1">
            <h2
              className="
    truncate
    text-sm
    font-semibold
    leading-5
    tracking-tight
    text-white

    sm:text-base
  "
              title={pipeline.name}
            >
              {pipeline.name}
            </h2>
          </div>
        </div>

        {/* ----------------------------------------------------------
            STATUS
        ---------------------------------------------------------- */}

        <div className="shrink-0">
          <StatusBadge
            status={pipeline.status}
          />
        </div>
      </div>

      {/* ============================================================
          DIVIDER
      ============================================================ */}

      <div
        className="
          my-4
          border-t
          border-slate-800

          sm:my-5
        "
      />

      {/* ============================================================
          PIPELINE DETAILS

          Keep this 2 x 2 even on mobile.
          This avoids the excessive vertical height that the
          previous version created.
      ============================================================ */}

      <div
        className="
          grid
          min-w-0
          grid-cols-2
          gap-x-5
          gap-y-4

          sm:gap-x-6
          sm:gap-y-5
        "
      >
        {/* ----------------------------------------------------------
            SOURCE
        ---------------------------------------------------------- */}

        <div className="min-w-0">
          <p
            className="
              mb-1
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-slate-500

              sm:mb-1.5
              sm:text-[10px]
            "
          >
            Source
          </p>

          <p
            className="
              truncate
              text-xs
              font-medium
              leading-5
              text-slate-200

              sm:text-sm
            "
          >
            {source === "api"
              ? "API Source"
              : source === "csv"
                ? "CSV File"
                : pipeline.source || "-"}
          </p>
        </div>

        {/* ----------------------------------------------------------
            DESTINATION
        ---------------------------------------------------------- */}

        <div className="min-w-0">
          <p
            className="
              mb-1
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-slate-500

              sm:mb-1.5
              sm:text-[10px]
            "
          >
            Destination
          </p>

          <p
            className="
              truncate
              font-mono
              text-xs
              leading-5
              text-slate-200

              sm:text-sm
            "
            title={pipeline.destination}
          >
            {pipeline.destination}
          </p>
        </div>

        {/* ----------------------------------------------------------
            SCHEDULE
        ---------------------------------------------------------- */}

        <div className="min-w-0">
          <p
            className="
              mb-1
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-slate-500

              sm:mb-1.5
              sm:text-[10px]
            "
          >
            Schedule
          </p>

          {isScheduled ? (
            <div
              className="
                flex
                min-w-0
                items-center
                gap-1.5
              "
            >
              <Clock3
                size={13}
                className="
                  shrink-0
                  text-blue-400
                "
              />

              <span
                className="
                  truncate
                  text-xs
                  text-slate-200

                  sm:text-sm
                "
              >
                {pipeline.schedule_type}
              </span>

              <span
                className="
                  hidden
                  shrink-0
                  text-[10px]
                  text-emerald-400

                  sm:inline
                "
              >
                • Active
              </span>
            </div>
          ) : (
            <span
              className="
                text-xs
                leading-5
                text-slate-400

                sm:text-sm
              "
            >
              Manual
            </span>
          )}
        </div>

        {/* ----------------------------------------------------------
            LAST RUN
        ---------------------------------------------------------- */}

        <div className="min-w-0">
          <p
            className="
              mb-1
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-slate-500

              sm:mb-1.5
              sm:text-[10px]
            "
          >
            Last Run
          </p>

          <p
            className="
              truncate
              text-xs
              leading-5
              text-slate-300

              sm:text-sm
            "
          >
            {formatLastRun()}
          </p>
        </div>
      </div>

      {/* ============================================================
          ACTIONS
      ============================================================ */}

      <div
        className="
          mt-4
          grid
          grid-cols-3
          gap-2

          sm:mt-5
          sm:gap-3
        "
      >
        {/* ----------------------------------------------------------
            RUN
        ---------------------------------------------------------- */}

        <button
          type="button"
          onClick={() =>
            onRun(pipeline.id)
          }
          disabled={running}
          className="
            flex
            h-9
            min-w-0
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-blue-500/20
            bg-blue-500/10
            px-2
            text-[11px]
            font-medium
            text-blue-300
            transition-all

            hover:bg-blue-500/15

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/30

            disabled:cursor-not-allowed
            disabled:opacity-60

            sm:h-10
            sm:gap-2
            sm:rounded-xl
            sm:px-3
            sm:text-sm
          "
        >
          {running ? (
            <Loader2
              size={14}
              className="
                shrink-0
                animate-spin
              "
            />
          ) : (
            <Play
              size={14}
              className="shrink-0"
            />
          )}

          <span className="truncate">
            {running
              ? "Running..."
              : "Run"}
          </span>
        </button>

        {/* ----------------------------------------------------------
            LOGS
        ---------------------------------------------------------- */}

        <button
          type="button"
          onClick={() =>
            onLogs(pipeline.id)
          }
          disabled={running}
          className="
            flex
            h-9
            min-w-0
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-amber-500/20
            bg-amber-500/10
            px-2
            text-[11px]
            font-medium
            text-amber-300
            transition-all

            hover:bg-amber-500/15

            focus:outline-none
            focus:ring-2
            focus:ring-amber-500/30

            disabled:cursor-not-allowed
            disabled:opacity-60

            sm:h-10
            sm:gap-2
            sm:rounded-xl
            sm:px-3
            sm:text-sm
          "
        >
          <FileText
            size={14}
            className="shrink-0"
          />

          <span className="truncate">
            Logs
          </span>
        </button>

        {/* ----------------------------------------------------------
            HISTORY
        ---------------------------------------------------------- */}

        <button
          type="button"
          onClick={() =>
            onHistory(pipeline.id)
          }
          disabled={running}
          className="
            flex
            h-9
            min-w-0
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-purple-500/20
            bg-purple-500/10
            px-2
            text-[11px]
            font-medium
            text-purple-300
            transition-all

            hover:bg-purple-500/15

            focus:outline-none
            focus:ring-2
            focus:ring-purple-500/30

            disabled:cursor-not-allowed
            disabled:opacity-60

            sm:h-10
            sm:gap-2
            sm:rounded-xl
            sm:px-3
            sm:text-sm
          "
        >
          <History
            size={14}
            className="shrink-0"
          />

          <span className="truncate">
            History
          </span>
        </button>
      </div>
    </div>
  );
}