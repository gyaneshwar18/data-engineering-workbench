import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

export default function ChartRenderer({ columns, rows }) {

  if (!rows || rows.length === 0) return null;

  // 🧠 CASE 1 — KPI (Single value)
  if (columns.length === 1 && rows.length === 1) {
    const value = rows[0][columns[0]];

    return (
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl mt-6 text-center">
        <h3 className="text-gray-400 mb-2">KPI</h3>
        <p className="text-3xl font-bold text-blue-400">
          {value}
        </p>
      </div>
    );
  }

  // 🧠 CASE 2 — Two columns
  if (columns.length === 2) {
    const [xKey, yKey] = columns;

    const isNumeric = typeof rows[0][yKey] === "number";

    // 🟢 BAR CHART
    if (isNumeric) {

      // 🔵 LINE CHART detection (date-like)
      const isDateLike = rows.every(row =>
        !isNaN(Date.parse(row[xKey]))
      );

      if (isDateLike) {
        return (
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl mt-6">
            <h3 className="text-white mb-3 font-semibold">
              Trend
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey={xKey} stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line type="monotone" dataKey={yKey} stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      }

      // 📊 BAR CHART
      return (
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl mt-6">
          <h3 className="text-white mb-3 font-semibold">
            Distribution
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

  return null;
}