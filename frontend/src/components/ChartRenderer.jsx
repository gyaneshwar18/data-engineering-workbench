import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  LineChart, Line
} from "recharts";

export default function ChartRenderer({ columns, rows, chartType }) {

  if (!rows || rows.length === 0) return null;

  const [xKey, yKey] = columns;

  const renderBar = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={rows}>
        <CartesianGrid stroke="#444" />
        <XAxis dataKey={xKey} stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Bar dataKey={yKey} fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderLine = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={rows}>
        <CartesianGrid stroke="#444" />
        <XAxis dataKey={xKey} stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Line dataKey={yKey} stroke="#22c55e" />
      </LineChart>
    </ResponsiveContainer>
  );

  // ❌ No chart
  if (chartType === "none") return null;

  // 🔵 Manual override
  if (chartType === "bar") return renderBar();
  if (chartType === "line") return renderLine();

  // 🧠 AUTO MODE

  // KPI
  if (columns.length === 1 && rows.length === 1) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl text-center mt-6">
        <p className="text-3xl text-blue-400 font-bold">
          {rows[0][columns[0]]}
        </p>
      </div>
    );
  }

  if (columns.length === 2) {
    const isDate = typeof rows[0][xKey] === "string" &&
      /^\d{4}-\d{2}-\d{2}/.test(rows[0][xKey]);

    return isDate ? renderLine() : renderBar();
  }

  return null;
}