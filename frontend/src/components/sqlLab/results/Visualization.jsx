import {
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";

const Visualization = ({
  columns = [],
  rows = [],
  chartType = "auto",
  onChartTypeChange = () => {},
  children,
}) => {
  const hasData =
    columns.length > 0 && rows.length > 0;

  const chartOptions = [
    {
      id: "auto",
      label: "Auto",
      icon: BarChart3,
    },
    {
      id: "bar",
      label: "Bar",
      icon: BarChart3,
    },
    {
      id: "line",
      label: "Line",
      icon: LineChart,
    },
    {
      id: "pie",
      label: "Pie",
      icon: PieChart,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/50 px-6 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Data Visualization
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Visualize SQL query results using interactive charts.
          </p>
        </div>

        {/* Chart Type */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 p-1">
          {chartOptions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onChartTypeChange(id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                chartType === id
                  ? "bg-cyan-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-[420px] items-center justify-center p-6">
        {hasData ? (
          children ? (
            children
          ) : (
            <div className="text-center">
              <BarChart3 className="mx-auto mb-4 h-14 w-14 text-cyan-400" />

              <h3 className="text-lg font-semibold text-white">
                Chart Area
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Connect your existing
                <span className="mx-1 font-medium text-cyan-400">
                  ChartRenderer
                </span>
                component here.
              </p>
            </div>
          )
        ) : (
          <div className="text-center">
            <BarChart3 className="mx-auto mb-4 h-14 w-14 text-slate-600" />

            <h3 className="text-lg font-semibold text-slate-300">
              No Visualization
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Execute a SQL query to generate charts from your result
              set.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualization;