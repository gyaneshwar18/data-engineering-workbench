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
    <div className="
  rounded-2xl p-6
  border border-gray-200 dark:border-gray-800
  bg-white shadow-sm
  dark:bg-gray-900
  h-80
">

     <h3 className="text-gray-800 font-semibold tracking-tight mb-4">


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
