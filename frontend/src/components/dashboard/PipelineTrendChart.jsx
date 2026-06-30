import {
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function PipelineTrendChart({
  data,
}) {
  const chartData =
    data && data.length > 0
      ? data
      : [
          {
            date: "Mon",
            success: 5,
            failed: 1,
          },
          {
            date: "Tue",
            success: 8,
            failed: 0,
          },
          {
            date: "Wed",
            success: 6,
            failed: 2,
          },
          {
            date: "Thu",
            success: 10,
            failed: 1,
          },
          {
            date: "Fri",
            success: 9,
            failed: 0,
          },
          {
            date: "Sat",
            success: 12,
            failed: 1,
          },
          {
            date: "Sun",
            success: 7,
            failed: 0,
          },
        ];

  const totalSuccess = chartData.reduce(
    (sum, item) => sum + item.success,
    0
  );

  const totalFailed = chartData.reduce(
    (sum, item) => sum + item.failed,
    0
  );

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

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div
              className="
                h-11
                w-11

                rounded-xl

                bg-green-500/10

                border
                border-green-500/20

                flex
                items-center
                justify-center
              "
            >
              <TrendingUp
                size={20}
                className="text-green-400"
              />
            </div>

            <div>

              <h2 className="text-lg font-semibold text-white">
                Pipeline Execution Trend
              </h2>

              <p className="text-sm text-slate-400">
                Pipeline executions over time
              </p>

            </div>

          </div>

          <div className="flex gap-6">

            <div className="text-right">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Success
              </p>

              <p className="text-xl font-bold text-green-400">
                {totalSuccess}
              </p>

            </div>

            <div className="text-right">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Failed
              </p>

              <p className="text-xl font-bold text-red-400">
                {totalFailed}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[340px] px-6 py-5">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="date"
              stroke="#64748b"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="#64748b"
              axisLine={false}
              tickLine={false}
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
              dataKey="success"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />

            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{
                r: 4,
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
          Success and failed pipeline executions for the last 7 days
        </p>

      </div>

    </div>
  );
}