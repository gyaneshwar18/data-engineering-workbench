import {
  Activity,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function QueryChart({
  data,
  metrics,
}) {
  const fallbackData = [
    { date: "Mon", total: 5 },
    { date: "Tue", total: 8 },
    { date: "Wed", total: 6 },
    { date: "Thu", total: 12 },
    { date: "Fri", total: 9 },
    { date: "Sat", total: 14 },
    { date: "Sun", total: 7 },
  ];

  const chartData =
    data && data.length > 0
      ? data
      : fallbackData;

  const successRate =
    metrics?.total_queries > 0
      ? (
          (metrics.successful_queries /
            metrics.total_queries) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div
      className="
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/90
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl

        sm:rounded-3xl
      "
    >
      {/* Header */}

      <div
        className="
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
              className="
                text-blue-400

                sm:h-5
                sm:w-5
              "
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
              Query Analytics
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[9px]
                leading-3.5
                text-slate-400

                sm:text-sm
                sm:leading-5
              "
            >
              SQL execution trends and performance
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}

      <div
        className="
          grid
          grid-cols-3
          gap-2
          px-3.5
          py-3.5

          sm:gap-6
          sm:px-5
          sm:py-5

          md:px-6
        "
      >
        <div className="min-w-0">
          <p
            className="
              truncate
              text-[8px]
              uppercase
              tracking-wider
              text-slate-500

              sm:text-xs
            "
          >
            Total Queries
          </p>

          <p
            className="
              mt-1
              truncate
              text-lg
              font-bold
              leading-6
              text-white

              sm:mt-2
              sm:text-2xl
            "
          >
            {metrics?.total_queries ?? 0}
          </p>
        </div>

        <div className="min-w-0">
          <p
            className="
              truncate
              text-[8px]
              uppercase
              tracking-wider
              text-slate-500

              sm:text-xs
            "
          >
            Success Rate
          </p>

          <p
            className="
              mt-1
              truncate
              text-lg
              font-bold
              leading-6
              text-emerald-400

              sm:mt-2
              sm:text-2xl
            "
          >
            {successRate}%
          </p>
        </div>

        <div className="min-w-0">
          <p
            className="
              truncate
              text-[8px]
              uppercase
              tracking-wider
              text-slate-500

              sm:text-xs
            "
          >
            Avg Execution
          </p>

          <p
            className="
              mt-1
              truncate
              text-lg
              font-bold
              leading-6
              text-blue-400

              sm:mt-2
              sm:text-2xl
            "
          >
            {metrics?.avg_execution_time?.toFixed(3) ?? 0}s
          </p>
        </div>
      </div>

      {/* Chart */}

      <div
        className="
          h-[230px]
          min-w-0
          px-1.5
          pb-3

          sm:h-[280px]
          sm:px-4
          sm:pb-4

          md:h-[300px]
          md:px-5

          lg:h-[320px]
          lg:px-6
          lg:pb-6
        "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: -8,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="date"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 9,
              }}
              interval="preserveStartEnd"
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 9,
              }}
              width={32}
              tickMargin={0}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{
                r: 3,
                fill: "#3b82f6",
              }}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-slate-800
          px-3.5
          py-2.5

          sm:px-5
          sm:py-4

          md:px-6
        "
      >
        <p
          className="
            truncate
            text-[9px]
            leading-4
            text-slate-500

            sm:text-xs
          "
        >
          Query activity over the last 7 days
        </p>
      </div>
    </div>
  );
}