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
        { date: "Mon", success: 5, failed: 1 },
        { date: "Tue", success: 8, failed: 0 },
        { date: "Wed", success: 6, failed: 2 },
        { date: "Thu", success: 10, failed: 1 },
        { date: "Fri", success: 9, failed: 0 },
        { date: "Sat", success: 12, failed: 1 },
        { date: "Sun", success: 7, failed: 0 },
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
            justify-between
            gap-2.5

            sm:gap-5
          "
        >
          {/* Title */}
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
                border-green-500/20
                bg-green-500/10

                sm:h-11
                sm:w-11
                sm:rounded-xl
              "
            >
              <TrendingUp
                size={16}
                className="
                  text-green-400

                  sm:h-5
                  sm:w-5
                "
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                className="
                  whitespace-nowrap
                  text-[12.5px]
                  font-semibold
                  leading-5
                  tracking-tight
                  text-white

                  sm:text-lg
                "
              >
                Pipeline Execution Trend
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
                Pipeline executions over time
              </p>
            </div>
          </div>

          {/* Summary */}
          <div
            className="
              flex
              shrink-0
              items-center
              gap-2.5

              sm:gap-6
            "
          >
            <div className="text-right">
              <p
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500

                  sm:text-xs
                "
              >
                Success
              </p>

              <p
                className="
                  text-sm
                  font-bold
                  leading-4
                  text-green-400

                  sm:text-xl
                  sm:leading-6
                "
              >
                {totalSuccess}
              </p>
            </div>

            <div className="text-right">
              <p
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500

                  sm:text-xs
                "
              >
                Failed
              </p>

              <p
                className="
                  text-sm
                  font-bold
                  leading-4
                  text-red-400

                  sm:text-xl
                  sm:leading-6
                "
              >
                {totalFailed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        className="
          h-[205px]
          px-1.5
          py-3

          sm:h-[270px]
          sm:px-4
          sm:py-4

          md:h-[300px]
          md:px-5

          lg:h-[320px]
          lg:px-6
          lg:py-5
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
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 9,
              }}
              interval="preserveStartEnd"
              padding={{
                left: 2,
                right: 2,
              }}
            />

            <YAxis
              stroke="#64748b"
              axisLine={false}
              tickLine={false}
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
              dataKey="success"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{
                r: 2.8,
              }}
              activeDot={{
                r: 5,
              }}
            />

            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{
                r: 2.8,
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
          sm:py-3

          md:px-6
          md:py-3.5
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
          Success and failed pipeline executions for the last 7 days
        </p>
      </div>
    </div>
  );
}