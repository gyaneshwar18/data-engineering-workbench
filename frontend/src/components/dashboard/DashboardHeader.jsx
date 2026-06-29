import {
  RefreshCw,
  LayoutDashboard,
} from "lucide-react";

export default function DashboardHeader({
  onRefresh,
  loading,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        rounded-3xl

        border
        border-slate-800

        bg-slate-900/90

        px-8
        py-7

        shadow-sm
      "
    >
      {/* Left */}

      <div className="flex items-center gap-5">

        <div
          className="
            h-16
            w-16

            rounded-2xl

            bg-blue-500/10

            border
            border-blue-500/20

            flex
            items-center
            justify-center
          "
        >
          <LayoutDashboard
            className="text-blue-400"
            size={30}
          />
        </div>

        <div>

          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            Monitor your pipelines,
            datasets and SQL workloads.
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <div className="text-right">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Last Updated
          </p>

          <p className="text-sm text-slate-300">
            Just now
          </p>

        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="
            h-12
            px-5

            rounded-xl

            border
            border-slate-700

            bg-slate-800/70

            hover:bg-slate-700

            disabled:opacity-50
            disabled:cursor-not-allowed

            transition-all

            flex
            items-center
            gap-2
          "
        >
          <RefreshCw
            size={18}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>

    </div>
  );
}