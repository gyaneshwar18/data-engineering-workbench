import {
  RefreshCw,
  LayoutDashboard,
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
        px-4
        py-4

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
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:gap-6
        "
      >
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4 md:gap-5">
          <img
            src="/logos/dashboard.svg"
            alt="Data Engineering Workbench"
            className="
              h-9
              w-9
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
                text-2xl
                font-bold
                leading-tight
                tracking-tight
                text-white

                sm:text-3xl
              "
            >
              Dashboard
            </h1>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-400

                sm:text-sm
              "
            >
              Operational overview of your data platform
            </p>
          </div>
        </div>

        {/* Right */}
        <div
          className="
            flex
            min-w-0
            items-center
            justify-between
            gap-3

            sm:justify-end
            sm:gap-4

            md:gap-5
          "
        >
          <div
            className="
              flex
              min-w-0
              shrink
              items-center
              gap-2
              text-xs
              text-slate-400

              sm:text-sm
            "
          >
            <Clock3
              size={15}
              className="shrink-0"
            />

            <span className="truncate">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              px-3
              py-2
              text-xs
              font-medium
              text-white
              transition-all

              hover:border-blue-500/30
              hover:bg-slate-700

              disabled:cursor-not-allowed
              disabled:opacity-50

              sm:rounded-xl
              sm:px-4
              sm:py-2.5
              sm:text-sm

              md:px-5
              md:py-3
            "
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />

            <span>Refresh Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}