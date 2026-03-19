import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function QueryChart({ data, metrics }) {

  // fallback demo data (so UI never looks empty)
  const fallbackData = [
    { date: "Mon", total: 5 },
    { date: "Tue", total: 8 },
    { date: "Wed", total: 6 },
    { date: "Thu", total: 12 },
    { date: "Fri", total: 9 },
    { date: "Sat", total: 14 },
    { date: "Sun", total: 7 }
  ];

  const chartData = data && data.length > 0 ? data : fallbackData;

  const successRate =
    metrics && metrics.total_queries > 0
      ? ((metrics.successful_queries / metrics.total_queries) * 100).toFixed(1)
      : 0;

  return (
    <div className="
      rounded-2xl p-6
      border border-gray-200 dark:border-gray-800
      bg-white dark:bg-gray-900
      shadow-sm
    ">

      {/* HEADER */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Query Execution Analytics
      </h3>

      {/* 🔥 INSIGHTS INSIDE CARD (NOT SEPARATE) */}
      <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300 mb-4">

        <span>
          Total: <b>{metrics?.total_queries ?? 0}</b>
        </span>

        <span>
          Success: <b>{successRate}%</b>
        </span>

        <span>
          Avg: <b>{metrics?.avg_execution_time?.toFixed(3) ?? 0}s</b>
        </span>

      </div>

      {/* GRAPH */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}