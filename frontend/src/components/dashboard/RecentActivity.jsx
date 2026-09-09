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
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/90

        sm:rounded-3xl
      "
    >
      {/* Header */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-3
          border-b
          border-slate-800
          px-3.5
          py-3

          sm:px-5
          sm:py-4

          md:px-6
          md:py-5
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2.5

            sm:gap-4
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-blue-500/20
              bg-blue-500/10

              sm:h-11
              sm:w-11
              sm:rounded-xl
            "
          >
            <Activity
              size={16}
              className="text-blue-400 sm:h-5 sm:w-5"
            />
          </div>

          <div className="min-w-0">
            <h2
              className="
                whitespace-nowrap
                text-[13px]
                font-semibold
                leading-5
                tracking-tight
                text-white

                sm:text-lg
              "
            >
              Recent Executions
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[9px]
                leading-3.5
                text-slate-400

                sm:mt-1
                sm:text-sm
                sm:leading-5
              "
            >
              Latest pipeline runs across your platform
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
              window.location.href = "/workbench/pipelines";
          }}
          className="
            flex
            h-8
            shrink-0
            items-center
            justify-center
            gap-1
            rounded-lg
            border
            border-slate-700
            bg-slate-800/60
            px-2.5
            text-[10px]
            font-medium
            text-slate-300
            transition-all

            hover:border-slate-600
            hover:bg-slate-800

            sm:h-auto
            sm:gap-2
            sm:px-3
            sm:py-2
            sm:text-sm
          "
        >
          View All

          <ChevronRight
            size={14}
            className="sm:h-4 sm:w-4"
          />
        </button>
      </div>

      {/* Loading */}

      {loading && (
        <div
          className="
            space-y-2
            p-3.5

            sm:space-y-3
            sm:p-5

            md:p-6
          "
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-14
                animate-pulse
                rounded-xl
                bg-slate-800/50

                sm:h-16
                sm:rounded-2xl
              "
            />
          ))}
        </div>
      )}

      {/* Empty */}

      {!loading && activity.length === 0 && (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            px-4
            py-12

            sm:px-6
            sm:py-16
          "
        >
          <Activity
            size={32}
            className="text-slate-600 sm:h-9 sm:w-9"
          />

          <h3
            className="
              mt-3
              text-base
              font-medium
              text-white

              sm:mt-4
              sm:text-lg
            "
          >
            No Recent Activity
          </h3>

          <p
            className="
              mt-1.5
              max-w-sm
              text-center
              text-xs
              leading-5
              text-slate-400

              sm:mt-2
              sm:text-sm
            "
          >
            Pipeline executions will appear here once
            your workflows start running.
          </p>
        </div>
      )}

      {/* Activity List */}

      {!loading && activity.length > 0 && (
        <div>
          {activity.map((item) => {
            const badge = getStatusBadge(item.status);

            return (
              <div
                key={item.id}
                className="
                  group
                  min-w-0
                  border-b
                  border-slate-800
                  px-3.5
                  py-3
                  last:border-b-0
                  transition-all
                  duration-200
                  hover:bg-slate-800/40

                  sm:px-5
                  sm:py-4

                  md:px-6
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    justify-between
                    gap-3

                    sm:gap-6
                  "
                >
                  {/* Left */}

                  <div className="min-w-0 flex-1">
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2

                        sm:gap-3
                      "
                    >
                      <h3
                        className="
                          min-w-0
                          truncate
                          text-xs
                          font-medium
                          text-white

                          sm:text-[15px]
                        "
                      >
                        {item.pipeline_name}
                      </h3>

                      <span
                        className={`
                          inline-flex
                          shrink-0
                          items-center
                          gap-1
                          rounded-full
                          px-2
                          py-0.5
                          text-[9px]
                          font-semibold

                          sm:gap-1.5
                          sm:px-2.5
                          sm:py-1
                          sm:text-[11px]

                          ${badge.className}
                        `}
                      >
                        {badge.icon}
                        {badge.label}
                      </span>
                    </div>

                    <div
                      className="
                        mt-1.5
                        flex
                        min-w-0
                        flex-wrap
                        items-center
                        gap-2.5
                        text-[10px]
                        text-slate-400

                        sm:mt-2
                        sm:gap-5
                        sm:text-sm
                      "
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Clock3
                          size={12}
                          className="shrink-0 sm:h-[14px] sm:w-[14px]"
                        />

                        <span className="whitespace-nowrap">
                          {formatDuration(
                            item.duration_seconds
                          )}
                        </span>
                      </div>

                      <span className="text-slate-600">
                        •
                      </span>

                      <span className="whitespace-nowrap">
                        {timeAgo(item.started_at)}
                      </span>
                    </div>
                  </div>

                  {/* Right */}

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1.5

                      sm:gap-3
                    "
                  >
                    <span
                      className="
                        rounded-md
                        border
                        border-slate-700
                        bg-slate-800/80
                        px-2
                        py-1
                        text-[9px]
                        font-medium
                        text-slate-300

                        sm:rounded-lg
                        sm:px-3
                        sm:py-1.5
                        sm:text-xs
                      "
                    >
                      #{item.id}
                    </span>

                    <ChevronRight
                      size={15}
                      className="
                        text-slate-600
                        transition-transform
                        group-hover:translate-x-1

                        sm:h-[18px]
                        sm:w-[18px]
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