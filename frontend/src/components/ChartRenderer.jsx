import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

export default function ChartRenderer({ columns, rows }) {

  // ❌ No data
  if (!rows || rows.length === 0) return null;

  // 🧠 Detect structure
  const isTwoColumns = columns.length === 2;

  if (isTwoColumns) {
    const [xKey, yKey] = columns;

    const isNumeric = typeof rows[0][yKey] === "number";

    if (isNumeric) {

      // 📊 BAR CHART
      return (
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl mt-6">
          <h3 className="text-white mb-3 font-semibold">
            Visualization
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rows}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey={xKey} stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey={yKey} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
  }

  // 📈 FUTURE: line chart, KPI, etc.
  return null;
}