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
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        px-8
        py-6
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-center gap-5">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              border
              border-blue-500/20

              bg-blue-500/10
            "
          >
            <LayoutDashboard
              size={26}
              className="text-blue-400"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Operational overview of your data platform
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-4">

          <div
            className="
              flex
              items-center
              gap-3

              rounded-xl

              border
              border-slate-800

              bg-slate-800/40

              px-4
              py-3
            "
          >
            <Clock3
              size={16}
              className="text-slate-500"
            />

            <div>

              <p className="text-[11px] uppercase tracking-wider text-slate-500">
                Last Updated
              </p>

              <p className="text-sm font-medium text-slate-200">
                {formatLastUpdated(lastUpdated)}
              </p>

            </div>

          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="
              flex
              items-center
              gap-2

              rounded-xl

              border
              border-slate-700

              bg-slate-800

              px-5
              py-3

              text-sm
              font-medium
              text-white

              transition-all
              duration-200

              hover:border-blue-500/30
              hover:bg-slate-700

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh Data

          </button>

        </div>

      </div>
    </div>
  );
}