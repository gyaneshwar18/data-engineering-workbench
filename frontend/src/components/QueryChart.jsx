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
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div
            className="
              h-11
              w-11

              rounded-xl

              bg-blue-500/10

              border
              border-blue-500/20

              flex
              items-center
              justify-center
            "
          >
            <Activity
              size={20}
              className="text-blue-400"
            />
          </div>

          <div>

            <h2 className="text-lg font-semibold text-white">
              Query Analytics
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              SQL execution trends and performance
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}

      <div className="grid grid-cols-3 gap-6 px-6 py-5">

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Total Queries
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {metrics?.total_queries ?? 0}
          </p>

        </div>

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Success Rate
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-400">
            {successRate}%
          </p>

        </div>

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Avg Execution
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-400">
            {metrics?.avg_execution_time?.toFixed(3) ?? 0}s
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[320px] px-6 pb-6">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
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
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#3b82f6",
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 px-6 py-4">

        <p className="text-xs text-slate-500">
          Query activity over the last 7 days
        </p>

      </div>

    </div>
  );
}