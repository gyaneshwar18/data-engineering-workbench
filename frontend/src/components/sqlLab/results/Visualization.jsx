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

  /* ================================================== */
  /* AXIS                                                */
  /* ================================================== */

  const renderXAxis = () => (
    <XAxis
      dataKey={categoryKey}
      stroke="#94A3B8"
      tick={{
        fill: "#94A3B8",
        fontSize: 12,
      }}
      tickLine={false}
      axisLine={{
        stroke: "#334155",
      }}
      interval="preserveStartEnd"
      tickMargin={8}
    />
  );

  const renderYAxis = () => (
    <YAxis
      stroke="#94A3B8"
      tick={{
        fill: "#94A3B8",
        fontSize: 12,
      }}
      tickLine={false}
      axisLine={false}
      width={55}
    />
  );

  /* ================================================== */
  /* TOOLTIP                                             */
  /* ================================================== */

  const renderTooltip = () => (
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
  );

  /* ================================================== */
  /* EMPTY STATE                                         */
  /* ================================================== */

  if (!canRender) {
    return (
      <div
        className="
          block
          w-full
          min-w-0
          max-w-full
          overflow-hidden

          rounded-2xl
          border
          border-slate-700

          bg-slate-900

          shadow-xl
        "
      >
        {/* Header */}

        <div
          className="
            flex
            w-full
            min-w-0
            max-w-full

            flex-wrap
            items-center
            justify-between
            gap-4

            border-b
            border-slate-700

            px-6
            py-5
          "
        >
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-white">
              Visualization
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Visual representation of SQL query results.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            {chartTypes.map((type) => {
              const Icon = icons[type.value];

              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    onChartTypeChange?.(type.value)
                  }
                  className={`
                    rounded-xl
                    p-3
                    transition

                    ${
                      chartType === type.value
                        ? "bg-cyan-500 text-slate-950"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    }
                  `}
                  title={type.label}
                  aria-label={type.label}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty state */}

        <div
          className="
            flex
            min-h-[420px]
            w-full
            min-w-0
            max-w-full

            flex-col
            items-center
            justify-center

            overflow-hidden

            px-6
            text-center
          "
        >
          <BarChart3 className="mb-4 h-12 w-12 text-slate-600" />

          <h3 className="text-lg font-semibold text-slate-300">
            No Data Available
          </h3>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-500
            "
          >
            {reason ||
              "Execute a SQL query with suitable data to visualize the results."}
          </p>
        </div>
      </div>
    );
  }

  /* ================================================== */
  /* CHART                                               */
  /* ================================================== */

  const renderChart = () => {
    /*
     * IMPORTANT:
     *
     * ResponsiveContainer is inside a fixed-width
     * bounded parent. This prevents Recharts from
     * contributing an unexpected intrinsic width to
     * the SQL Lab page.
     */

    switch (chartType) {
      /* ================================================ */
      /* LINE                                               */
      /* ================================================ */

      case "line":
        return (
          <ResponsiveContainer
            width="100%"
            height={420}
            minWidth={0}
          >
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

              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}

              <Legend />

              {numericKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={
                    COLORS[index % COLORS.length]
                  }
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      /* ================================================ */
      /* AREA                                               */
      /* ================================================ */

      case "area":
        return (
          <ResponsiveContainer
            width="100%"
            height={420}
            minWidth={0}
          >
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

              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}

              <Legend />

              {numericKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={
                    COLORS[index % COLORS.length]
                  }
                  fill={
                    COLORS[index % COLORS.length]
                  }
                  fillOpacity={0.18}
                  strokeWidth={2.5}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      /* ================================================ */
      /* PIE                                                */
      /* ================================================ */

      case "pie": {
        const pieData = getPieData(
          data,
          categoryKey,
          numericKey
        );

        return (
          <ResponsiveContainer
            width="100%"
            height={420}
            minWidth={0}
          >
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
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      }

      /* ================================================ */
      /* BAR                                                */
      /* ================================================ */

      default:
        return (
          <ResponsiveContainer
            width="100%"
            height={420}
            minWidth={0}
          >
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

              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}

              <Legend />

              {numericKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  radius={[8, 8, 0, 0]}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  /* ================================================== */
  /* MAIN VISUALIZATION                                 */
  /* ================================================== */

  return (
    <div
      className="
        block
        w-full
        min-w-0
        max-w-full

        overflow-hidden

        rounded-2xl
        border
        border-slate-700

        bg-slate-900

        shadow-xl
      "
    >
      {/* ================================================== */}
      {/* HEADER                                             */}
      {/* ================================================== */}

      <div
        className="
          flex
          w-full
          min-w-0
          max-w-full

          flex-wrap
          items-center
          justify-between
          gap-4

          border-b
          border-slate-700

          px-6
          py-5
        "
      >
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white">
            Visualization
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Visual representation of SQL query results.
          </p>
        </div>

        {/* ================================================== */}
        {/* CHART TYPE CONTROLS                               */}
        {/* ================================================== */}

        <div
          className="
            flex
            shrink-0
            gap-2
          "
        >
          {chartTypes.map((type) => {
            const Icon = icons[type.value];

            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  onChartTypeChange?.(type.value)
                }
                className={`
                  rounded-xl
                  p-3
                  transition

                  ${
                    chartType === type.value
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }
                `}
                title={type.label}
                aria-label={type.label}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================== */}
      {/* CHART VIEWPORT                                    */}
      {/* ================================================== */}

      <div
        className="
          block
          w-full
          min-w-0
          max-w-full

          overflow-hidden

          p-4
          sm:p-6
        "
      >
        {/* ================================================== */}
        {/* BOUNDED CHART CONTAINER                           */}
        {/* ================================================== */}

        <div
          className="
            relative
            block

            h-[420px]
            w-full
            min-w-0
            max-w-full

            overflow-hidden
          "
        >
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default Visualization;