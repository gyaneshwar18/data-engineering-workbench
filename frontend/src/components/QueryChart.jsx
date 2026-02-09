import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", queries: 5 },
  { day: "Tue", queries: 8 },
  { day: "Wed", queries: 6 },
  { day: "Thu", queries: 12 },
  { day: "Fri", queries: 9 },
  { day: "Sat", queries: 14 },
  { day: "Sun", queries: 7 }
];

export default function QueryChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow h-72">
      <h3 className="font-semibold mb-4">
        SQL Practice Trend
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="queries" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
