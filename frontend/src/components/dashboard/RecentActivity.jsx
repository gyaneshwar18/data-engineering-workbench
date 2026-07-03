import { useEffect, useState } from "react";
import {
  Clock3,
  CheckCircle2,
  XCircle,
  LoaderCircle,
  ChevronRight,
} from "lucide-react";

import { getRecentActivity } from "../../api/dashboardApi";

function getStatusBadge(status) {
  switch (status?.toLowerCase()) {
    case "success":
      return {
        text: "SUCCESS",
        bg: "bg-emerald-500/10",
        textColor: "text-emerald-400",
        border: "border-emerald-500/20",
        icon: (
          <CheckCircle2
            size={16}
            className="text-emerald-400"
          />
        ),
      };

    case "failed":
      return {
        text: "FAILED",
        bg: "bg-red-500/10",
        textColor: "text-red-400",
        border: "border-red-500/20",
        icon: (
          <XCircle
            size={16}
            className="text-red-400"
          />
        ),
      };

    default:
      return {
        text: "RUNNING",
        bg: "bg-amber-500/10",
        textColor: "text-amber-400",
        border: "border-amber-500/20",
        icon: (
          <LoaderCircle
            size={16}
            className="animate-spin text-amber-400"
          />
        ),
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
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">

        <div>

          <h2 className="text-xl font-semibold text-white">
            Recent Pipeline Activity
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Latest pipeline executions across your platform
          </p>

        </div>

        <button
          className="
            flex
            items-center
            gap-1
            text-sm
            text-blue-400
            hover:text-blue-300
          "
        >
          View All

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="p-10 text-center text-slate-400">

          Loading recent activity...

        </div>

      )}

      {/* Empty */}

      {!loading && activity.length === 0 && (

        <div className="p-10 text-center text-slate-500">

          No pipeline activity found.

        </div>

      )}

      {/* Activity */}

      {!loading && activity.length > 0 && (

        <div>

          {activity.map((item) => {

            const badge = getStatusBadge(item.status);

            return (

              <div
                key={item.id}
                className="
                  px-6
                  py-5

                  border-b
                  border-slate-800

                  hover:bg-slate-800/40

                  transition
                "
              >

                <div className="flex items-center justify-between">

                  {/* Left */}

                  <div>

                    <h3 className="font-semibold text-white">

                      {item.pipeline_name}

                    </h3>

                    <div className="flex items-center gap-5 mt-2">

                      <div
                        className={`
                          flex
                          items-center
                          gap-2

                          px-3
                          py-1

                          rounded-full

                          border

                          ${badge.bg}
                          ${badge.border}
                        `}
                      >

                        {badge.icon}

                        <span
                          className={`
                            text-xs
                            font-semibold

                            ${badge.textColor}
                          `}
                        >

                          {badge.text}

                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-400">

                        <Clock3 size={15} />

                        {formatDuration(
                          item.duration_seconds
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="text-right">

                    <p className="text-sm text-slate-400">

                      {timeAgo(item.started_at)}

                    </p>

                    <p className="text-xs text-slate-500 mt-2">

                      Run #{item.id}

                    </p>

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