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
  bg-white/90 backdrop-blur
  p-6 rounded-2xl
  border border-gray-100
  shadow-sm hover:shadow-md
  transition
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
