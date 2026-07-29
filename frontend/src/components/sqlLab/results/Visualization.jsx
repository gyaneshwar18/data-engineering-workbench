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
} from "../utils/chartHelper";

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
        <div className="flex h-[420px] items-center justify-center text-slate-500">
          {reason}
        </div>
      );
    }

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey={categoryKey} stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />

              {numericKeys.map((key, index) => (
                <Line
                  key={key}
                  dataKey={key}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey={categoryKey} stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />

              {numericKeys.map((key, index) => (
                <Area
                  key={key}
                  dataKey={key}
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.3}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <PieChart>
              <Tooltip />
              <Legend />

              <Pie
                data={getPieData(
                  data,
                  categoryKey,
                  numericKey
                )}
                dataKey="value"
                nameKey="name"
                outerRadius={140}
                label
              >
                {getPieData(
                  data,
                  categoryKey,
                  numericKey
                ).map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey={categoryKey} stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />

              {numericKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  radius={[8, 8, 0, 0]}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Visualization
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Visual representation of SQL query results.
          </p>
        </div>

        <div className="flex gap-2">
          {chartTypes.map((type) => {
            const Icon = icons[type.value];

            return (
              <button
                key={type.value}
                onClick={() =>
                  onChartTypeChange(type.value)
                }
                className={`rounded-xl p-3 transition ${
                  chartType === type.value
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
                title={type.label}
              >
                <Icon size={18} />
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