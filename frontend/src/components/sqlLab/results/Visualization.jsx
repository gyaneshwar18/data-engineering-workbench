import {
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart as AreaChartIcon,
} from "lucide-react";

import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  getChartData,
  getPieData,
  chartTypes,
  COLORS,
} from "../utils/chartHelpers";

const icons = {
  bar: BarChart3,
  line: LineChartIcon,
  area: AreaChartIcon,
  pie: PieChartIcon,
};

const Visualization = ({
  columns = [],
  rows = [],
  chartType = "bar",
  onChartTypeChange,
}) => {
  const {
    canRender,
    data,
    categoryKey,
    numericKeys,
    reason,
  } = getChartData(columns, rows);

  const numericKey = numericKeys[0];

  const renderChart = () => {
    if (!canRender) {
      return (
        <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
          <BarChart3 className="mb-4 h-12 w-12 text-slate-600" />

          <h3 className="text-lg font-semibold text-slate-300">
            No Data Available
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            {reason || "Execute a SQL query with suitable data to visualize the results."}
          </p>
        </div>
      );
    }

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />

              <XAxis
                dataKey={categoryKey}
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
              />

              <YAxis
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                }}
                labelStyle={{
                  color: "#cbd5e1",
                  fontWeight: 600,
                }}
              />

              <Legend />

              {numericKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />

              <XAxis
                dataKey={categoryKey}
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
              />

              <YAxis
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                }}
                labelStyle={{
                  color: "#cbd5e1",
                  fontWeight: 600,
                }}
              />

              <Legend />

              {numericKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.18}
                  strokeWidth={2.5}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie": {
        const pieData = getPieData(
          data,
          categoryKey,
          numericKey
        );

        return (
          <ResponsiveContainer width="100%" height={420}>
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                }}
              />

              <Legend />

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={145}
                innerRadius={55}
                paddingAngle={2}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      }

      default:
        return (
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />

              <XAxis
                dataKey={categoryKey}
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
              />

              <YAxis
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                }}
                labelStyle={{
                  color: "#cbd5e1",
                  fontWeight: 600,
                }}
              />

              <Legend />

              {numericKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  radius={[6, 6, 0, 0]}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/70 shadow-xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-5">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Visualization
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Visual representation of SQL query results.
          </p>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 p-1.5">

          {chartTypes.map((type) => {
            const Icon = icons[type.value];

            const isActive =
              chartType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  onChartTypeChange(type.value)
                }
                title={type.label}
                aria-label={`Use ${type.label} chart`}
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:bg-slate-700 hover:text-white"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
              </button>
            );
          })}

        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        {renderChart()}
      </div>

    </div>
  );
};

export default Visualization;