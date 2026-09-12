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

const MAX_PIE_ITEMS = 8;

/* ============================================================
   TOOLTIP
============================================================ */

const ChartTooltip = () => (
  <Tooltip
    cursor={{
      fill: "rgba(51, 65, 85, 0.18)",
    }}
    contentStyle={{
      backgroundColor: "#0f172a",
      border: "1px solid #334155",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      padding: "10px 12px",
    }}
    labelStyle={{
      color: "#e2e8f0",
      fontWeight: 600,
      marginBottom: "4px",
    }}
    itemStyle={{
      color: "#cbd5e1",
      fontSize: "12px",
    }}
  />
);

/* ============================================================
   CUSTOM PIE LEGEND
============================================================ */

const CustomPieLegend = ({ payload = [] }) => {
  if (!payload.length) return null;

  return (
    <div
      className="
        mt-4
        flex
        max-h-[120px]
        w-full
        flex-wrap
        justify-center
        gap-x-4
        gap-y-2
        overflow-y-auto
        px-2
      "
    >
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="
            flex
            min-w-0
            max-w-[180px]
            items-center
            gap-2
          "
          title={entry.value}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{
              backgroundColor:
                entry.color ||
                COLORS[index % COLORS.length],
            }}
          />

          <span
            className="
              min-w-0
              truncate
              text-xs
              text-slate-400
            "
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   PIE DATA PREPARATION
============================================================ */

const preparePieData = (
  data,
  categoryKey,
  numericKey
) => {
  const rawData = getPieData(
    data,
    categoryKey,
    numericKey
  );

  if (!rawData || rawData.length <= MAX_PIE_ITEMS) {
    return rawData || [];
  }

  const sorted = [...rawData].sort(
    (a, b) => Number(b.value) - Number(a.value)
  );

  const topItems = sorted.slice(
    0,
    MAX_PIE_ITEMS
  );

  const remaining = sorted
    .slice(MAX_PIE_ITEMS)
    .reduce(
      (sum, item) =>
        sum + Number(item.value || 0),
      0
    );

  if (remaining > 0) {
    topItems.push({
      name: "Other",
      value: remaining,
    });
  }

  return topItems;
};

/* ============================================================
   AXIS HELPERS
============================================================ */

/*
  Keep category labels readable without allowing them
  to collide with neighboring labels.
*/
const formatCategoryLabel = (
  value,
  maxLength = 12
) => {
  const text = String(value ?? "").trim();

  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}…`;
};

/*
  Dynamically decide how many X-axis labels should be visible.

  The chart still contains every data point.
  We only reduce the number of displayed labels.

  Tooltips continue to expose the complete value.
*/
const getXAxisInterval = (dataLength) => {
  if (dataLength <= 5) {
    return 0;
  }

  if (dataLength <= 8) {
    return 1;
  }

  if (dataLength <= 12) {
    return 2;
  }

  if (dataLength <= 16) {
    return 3;
  }

  return Math.ceil(dataLength / 5) - 1;
};

const renderXAxis = (
  categoryKey,
  data
) => (
  <XAxis
    dataKey={categoryKey}
    stroke="#64748b"
    tick={{
      fill: "#94a3b8",
      fontSize: 10,
    }}
    tickLine={false}
    axisLine={{
      stroke: "#334155",
    }}
    interval={getXAxisInterval(data.length)}
    tickMargin={8}
    height={38}
    minTickGap={14}
    tickFormatter={(value) =>
      formatCategoryLabel(value, 12)
    }
  />
);

const renderYAxis = () => (
  <YAxis
    stroke="#64748b"
    tick={{
      fill: "#94a3b8",
      fontSize: 10,
    }}
    tickLine={false}
    axisLine={false}
    width={34}
    tickMargin={4}
    allowDecimals={false}
  />
);

/* ============================================================
   COMPONENT
============================================================ */

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
  } = getChartData(
    columns,
    rows
  );

  const numericKey = numericKeys[0];

  /* ============================================================
     EMPTY STATE
  ============================================================ */

  const renderEmptyState = () => (
    <div
      className="
        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center
        px-5
        text-center

        sm:min-h-[340px]
        sm:px-6

        lg:min-h-[420px]
      "
    >
      <div
        className="
          mb-4
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-slate-700
          bg-slate-800/70

          sm:mb-5
          sm:h-16
          sm:w-16
          sm:rounded-2xl
        "
      >
        <BarChart3
          className="
            h-5
            w-5
            text-slate-600

            sm:h-7
            sm:w-7
          "
        />
      </div>

      <h3
        className="
          text-base
          font-semibold
          text-slate-300

          sm:text-lg
        "
      >
        Ready to Visualize
      </h3>

      <p
        className="
          mt-1.5
          max-w-md
          text-xs
          leading-5
          text-slate-500

          sm:mt-2
          sm:text-sm
          sm:leading-6
        "
      >
        {reason ||
          "Run a SQL query to generate data for your visualization."}
      </p>
    </div>
  );

  /* ============================================================
     LINE CHART
  ============================================================ */

  const renderLineChart = () => (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 8,
          left: 2,
          bottom: 2,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 6"
          stroke="#1e293b"
          vertical={false}
        />

        {renderXAxis(
          categoryKey,
          data
        )}

        {renderYAxis()}

        <ChartTooltip />

        {numericKeys.length > 1 && (
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          />
        )}

        {numericKeys.map(
          (key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
              }}
              connectNulls
            />
          )
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  /* ============================================================
     AREA CHART
  ============================================================ */

  const renderAreaChart = () => (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 8,
          left: 2,
          bottom: 2,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 6"
          stroke="#1e293b"
          vertical={false}
        />

        {renderXAxis(
          categoryKey,
          data
        )}

        {renderYAxis()}

        <ChartTooltip />

        {numericKeys.length > 1 && (
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          />
        )}

        {numericKeys.map(
          (key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
              fill={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
              fillOpacity={0.12}
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
              }}
              connectNulls
            />
          )
        )}
      </AreaChart>
    </ResponsiveContainer>
  );

  /* ============================================================
     BAR CHART
  ============================================================ */

  const renderBarChart = () => (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 8,
          left: 2,
          bottom: 2,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 6"
          stroke="#1e293b"
          vertical={false}
        />

        {renderXAxis(
          categoryKey,
          data
        )}

        {renderYAxis()}

        <ChartTooltip />

        {numericKeys.length > 1 && (
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          />
        )}

        {numericKeys.map(
          (key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
              radius={[
                6,
                6,
                0,
                0,
              ]}
              maxBarSize={55}
            />
          )
        )}
      </BarChart>
    </ResponsiveContainer>
  );

  /* ============================================================
     PIE CHART
  ============================================================ */

  const renderPieChart = () => {
    const pieData =
      preparePieData(
        data,
        categoryKey,
        numericKey
      );

    return (
      <div
        className="
          flex
          w-full
          flex-col
          items-center
        "
      >
        <div
          className="
            h-[220px]
            w-full
            min-w-0

            sm:h-[280px]

            lg:h-[350px]
          "
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#0f172a",
                  border:
                    "1px solid #334155",
                  borderRadius:
                    "12px",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.35)",
                  padding:
                    "10px 12px",
                }}
                labelStyle={{
                  color:
                    "#e2e8f0",
                  fontWeight: 600,
                }}
                itemStyle={{
                  color:
                    "#cbd5e1",
                  fontSize:
                    "12px",
                }}
              />

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="35%"
                outerRadius="65%"
                paddingAngle={2}
                stroke="#0f172a"
                strokeWidth={2}
              >
                {pieData.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <CustomPieLegend
          payload={pieData.map(
            (item, index) => ({
              value: item.name,
              color:
                COLORS[
                  index %
                  COLORS.length
                ],
            })
          )}
        />
      </div>
    );
  };

  /* ============================================================
     SELECT CHART
  ============================================================ */

  const renderChart = () => {
    if (!canRender) {
      return renderEmptyState();
    }

    switch (chartType) {
      case "line":
        return renderLineChart();

      case "area":
        return renderAreaChart();

      case "pie":
        return renderPieChart();

      case "bar":
      default:
        return renderBarChart();
    }
  };

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div
      className="
        block
        w-full
        min-w-0
        max-w-full
        overflow-hidden
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        shadow-xl

        sm:rounded-2xl
      "
    >
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div
        className="
          flex
          w-full
          min-w-0
          flex-col
          gap-3
          border-b
          border-slate-700
          px-3.5
          py-3.5

          sm:px-5
          sm:py-4

          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:gap-5
          lg:px-6
          lg:py-5
        "
      >
        {/* ------------------------------------------------------
            TITLE
        ------------------------------------------------------ */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2.5

            sm:gap-3
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-cyan-500/20
              bg-cyan-500/10

              sm:h-10
              sm:w-10
              sm:rounded-xl
            "
          >
            {(() => {
              const Icon =
                icons[chartType] ||
                BarChart3;

              return (
                <Icon
                  className="
                    h-4
                    w-4
                    text-cyan-400

                    sm:h-5
                    sm:w-5
                  "
                />
              );
            })()}
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-sm
                font-semibold
                text-white

                sm:text-lg
              "
            >
              Visualization
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[10px]
                text-slate-400

                sm:mt-1
                sm:text-sm
              "
            >
              Visual representation of your SQL query results.
            </p>
          </div>
        </div>

        {/* ======================================================
            CHART TYPE SELECTOR
        ====================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-2
            gap-1
            rounded-xl
            border
            border-slate-700
            bg-slate-800/70
            p-1

            sm:flex
            sm:w-auto
            sm:gap-1
          "
        >
          {chartTypes.map(
            (type) => {
              const Icon =
                icons[type.value];

              const active =
                chartType ===
                type.value;

              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    onChartTypeChange?.(
                      type.value
                    )
                  }
                  title={type.label}
                  aria-label={
                    type.label
                  }
                  aria-pressed={
                    active
                  }
                  className={`
                    flex
                    h-10
                    min-w-0
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    px-2.5
                    text-xs
                    font-medium
                    transition-all
                    duration-200

                    sm:h-9
                    sm:min-w-[92px]
                    sm:px-3

                    ${
                      active
                        ? `
                          bg-cyan-500
                          text-slate-950
                          shadow-md
                          shadow-cyan-500/20
                        `
                        : `
                          text-slate-400
                          hover:bg-slate-700
                          hover:text-slate-100
                        `
                    }
                  `}
                >
                  <Icon
                    className="
                      h-4
                      w-4
                      shrink-0
                    "
                    strokeWidth={
                      active
                        ? 2
                        : 1.8
                    }
                  />

                  <span className="truncate">
                    {type.label}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* ========================================================
          CHART CONTENT
      ======================================================== */}

      <div
        className="
          block
          w-full
          min-w-0
          max-w-full
          overflow-hidden
          p-3

          sm:p-5

          md:p-6
        "
      >
        <div
          className="
            w-full
            min-w-0
            max-w-full
            overflow-hidden
            rounded-lg
            border
            border-slate-800
            bg-slate-950/40

            sm:rounded-xl
          "
        >
          <div
            className="
              h-[285px]
              w-full
              min-w-0

              sm:h-[340px]

              lg:h-[440px]
            "
          >
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;