import { useEffect, useState } from "react";
import {
  Clock3,
  CheckCircle2,
  XCircle,
  LoaderCircle,
  Activity,
  ChevronRight,
} from "lucide-react";

import { getRecentActivity } from "../../api/dashboardApi";

function getStatusBadge(status) {
  switch (status?.toLowerCase()) {
    case "success":
      return {
        label: "Success",
        icon: (
          <CheckCircle2
            size={14}
            className="text-emerald-400"
          />
        ),
        className:
          "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
      };

    case "failed":
      return {
        label: "Failed",
        icon: (
          <XCircle
            size={14}
            className="text-red-400"
          />
        ),
        className:
          "bg-red-500/10 border border-red-500/20 text-red-400",
      };

    default:
      return {
        label: "Running",
        icon: (
          <LoaderCircle
            size={14}
            className="animate-spin text-amber-400"
          />
        ),
        className:
          "bg-amber-500/10 border border-amber-500/20 text-amber-400",
      };
  }
}

function formatDuration(seconds) {
  if (seconds == null) return "--";

  if (seconds < 1) {
    return `${Math.round(seconds * 1000)} ms`;
  }

  return `${seconds.toFixed(1)} sec`;
}

function timeAgo(date) {
  const now = new Date();
  const started = new Date(date);

  const diff = Math.floor((now - started) / 1000);

  if (diff < 60) return "Just now";

  if (diff < 3600)
    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr ago`;

  return `${Math.floor(diff / 86400)} day ago`;
}

export default function RecentActivity() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
    try {
      const data = await getRecentActivity();
      setActivity(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-blue-500/20
              bg-blue-500/10
            "
          >
            <Activity
              size={20}
              className="text-blue-400"
            />
          </div>

          <div>

            <h2 className="text-lg font-semibold text-white">
              Recent Executions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Latest pipeline runs across your platform
            </p>

          </div>

        </div>

        <button
          className="
            flex
            items-center
            gap-2

            rounded-lg

            border
            border-slate-700

            bg-slate-800/60

            px-3
            py-2

            text-sm
            text-slate-300

            transition-all

            hover:border-slate-600
            hover:bg-slate-800
          "
        >
          View All

          <ChevronRight size={16} />

        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="space-y-3 p-6">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="
                h-16
                animate-pulse
                rounded-2xl
                bg-slate-800/50
              "
            />

          ))}

        </div>

      )}

      {/* Empty */}

      {!loading && activity.length === 0 && (

        <div className="flex flex-col items-center justify-center px-6 py-16">

          <Activity
            size={36}
            className="text-slate-600"
          />

          <h3 className="mt-4 text-lg font-medium text-white">
            No Recent Activity
          </h3>

          <p className="mt-2 text-center text-sm text-slate-400">
            Pipeline executions will appear here once
            your workflows start running.
          </p>

        </div>

      )}

      {/* Activity List */}

      {!loading && activity.length > 0 && (

        <div>          {activity.map((item) => {
            const badge = getStatusBadge(item.status);

            return (
              <div
                key={item.id}
                className="
                  group
                  border-b
                  border-slate-800
                  last:border-b-0

                  px-6
                  py-4

                  transition-all
                  duration-200

                  hover:bg-slate-800/40
                "
              >
                <div className="flex items-center justify-between gap-6">

                  {/* Left */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-3">

                      <h3
                        className="
                          truncate
                          text-[15px]
                          font-medium
                          text-white
                        "
                      >
                        {item.pipeline_name}
                      </h3>

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5

                          rounded-full

                          px-2.5
                          py-1

                          text-[11px]
                          font-semibold

                          ${badge.className}
                        `}
                      >
                        {badge.icon}
                        {badge.label}
                      </span>

                    </div>

                    <div
                      className="
                        mt-2

                        flex
                        flex-wrap
                        items-center
                        gap-5

                        text-sm
                        text-slate-400
                      "
                    >
                      <div className="flex items-center gap-2">

                        <Clock3 size={14} />

                        <span>
                          {formatDuration(
                            item.duration_seconds
                          )}
                        </span>

                      </div>

                      <span className="text-slate-600">
                        •
                      </span>

                      <span>
                        {timeAgo(item.started_at)}
                      </span>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="flex items-center gap-3">

                    <span
                      className="
                        rounded-lg

                        border
                        border-slate-700

                        bg-slate-800/80

                        px-3
                        py-1.5

                        text-xs
                        font-medium
                        text-slate-300
                      "
                    >
                      #{item.id}
                    </span>

                    <ChevronRight
                      size={18}
                      className="
                        text-slate-600
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}