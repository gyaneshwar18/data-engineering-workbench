import {
  RefreshCw,
  Clock3,
} from "lucide-react";

function formatLastUpdated(date) {
  if (!date) return "Never";

  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);

  if (diff < 60) return "Just now";

  if (diff < 3600)
    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr ago`;

  return new Date(date).toLocaleDateString();
}

export default function DashboardHeader({
  onRefresh,
  loading,
  lastUpdated,
}) {
  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/90
        px-3.5
        py-3.5

        sm:rounded-3xl
        sm:px-5
        sm:py-5

        md:px-6
        md:py-6

        lg:px-8
      "
    >
      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-3

          sm:gap-5
        "
      >
        {/* Identity */}
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2.5

            sm:gap-4
            md:gap-5
          "
        >
          <img
            src="/logos/dashboard.svg"
            alt="Data Engineering Workbench"
            className="
              h-8
              w-8
              shrink-0
              object-contain

              sm:h-10
              sm:w-10

              md:h-12
              md:w-12
            "
          />

          <div className="min-w-0">
            <h1
              className="
                text-xl
                font-bold
                leading-6
                tracking-tight
                text-white

                sm:text-2xl
                sm:leading-7

                md:text-3xl
                md:leading-9
              "
            >
              Dashboard
            </h1>

            {/* Mobile */}
            <p
              className="
                mt-0.5
                truncate
                text-[10px]
                font-medium
                leading-4
                text-slate-500

                sm:hidden
              "
            >
              Data platform overview
            </p>

            {/* Desktop / Tablet */}
            <p
              className="
                mt-1
                hidden
                truncate
                text-sm
                leading-5
                text-slate-400

                sm:block
              "
            >
              Operational overview of your data platform
            </p>
          </div>
        </div>

        {/* Controls */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-2

            sm:gap-3
            md:gap-5
          "
        >
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-[10px]
              font-medium
              text-slate-400

              sm:gap-2
              sm:text-sm
            "
          >
            <Clock3
              size={13}
              className="
                shrink-0

                sm:h-[15px]
                sm:w-[15px]
              "
            />

            {/* Compact mobile text */}
            <span className="sm:hidden">
              {formatLastUpdated(lastUpdated)}
            </span>

            {/* Full text on larger screens */}
            <span className="hidden sm:inline">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh dashboard data"
            title="Refresh Data"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              text-white
              transition-all

              hover:border-blue-500/30
              hover:bg-slate-700

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:h-auto
              sm:w-auto
              sm:gap-2
              sm:rounded-xl
              sm:px-3.5
              sm:py-2.5

              md:px-5
              md:py-3
            "
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin" : ""}
            />

            <span className="hidden text-sm font-medium sm:inline">
              Refresh Data
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}