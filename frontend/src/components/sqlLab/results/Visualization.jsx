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


/* ============================================================
   CONSTANTS
============================================================ */

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
   AXIS
============================================================ */

const renderXAxis = (
  categoryKey,
  data
) => (
  <XAxis
    dataKey={categoryKey}
    stroke="#64748b"
    tick={{
      fill: "#94a3b8",
      fontSize: 11,
    }}
    tickLine={false}
    axisLine={{
      stroke: "#334155",
    }}
    interval={
      data.length > 8
        ? Math.ceil(data.length / 8)
        : 0
    }
    tickMargin={10}
    tickFormatter={(value) => {
      const text = String(value ?? "");

      return text.length > 16
        ? `${text.slice(0, 16)}…`
        : text;
    }}
  />
);


const renderYAxis = () => (
  <YAxis
    stroke="#64748b"
    tick={{
      fill: "#94a3b8",
      fontSize: 11,
    }}
    tickLine={false}
    axisLine={false}
    width={55}
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
        min-h-[440px]
        flex-col
        items-center
        justify-center
        px-6
        text-center
      "
    >
      <div
        className="
          mb-5
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-700
          bg-slate-800/70
        "
      >
        <BarChart3
          className="
            h-7
            w-7
            text-slate-600
          "
        />
      </div>

      <h3
        className="
          text-lg
          font-semibold
          text-slate-300
        "
      >
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
          "Execute a SQL query with suitable numeric data to visualize the results."}
      </p>
    </div>
  );


  /* ============================================================
     LINE CHART
  ============================================================ */

  const renderLineChart = () => (
    <ResponsiveContainer
      width="100%"
      height={440}
    >
      <LineChart
        data={data}
        margin={{
          top: 15,
          right: 20,
          left: 5,
          bottom: 15,
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
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
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
      height={440}
    >
      <AreaChart
        data={data}
        margin={{
          top: 15,
          right: 20,
          left: 5,
          bottom: 15,
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
              strokeWidth={3}
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
      height={440}
    >
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 20,
          left: 5,
          bottom: 15,
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
                7,
                7,
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

        {/* Pie itself */}
        <div
          className="
            h-[350px]
            w-full
            min-w-0
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
                innerRadius={78}
                outerRadius={125}
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


        {/* Controlled legend */}
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

        rounded-2xl
        border
        border-slate-700

        bg-slate-900

        shadow-xl
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

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-xl

                border
                border-cyan-500/20

                bg-cyan-500/10
              "
            >
              {(() => {
                const Icon =
                  icons[
                    chartType
                  ] ||
                  BarChart3;

                return (
                  <Icon
                    className="
                      h-5
                      w-5
                      text-cyan-400
                    "
                  />
                );
              })()}
            </div>

            <div className="min-w-0">

              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Visualization
              </h2>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  text-slate-400
                "
              >
                Visual representation of
                your SQL query results.
              </p>

            </div>

          </div>
        </div>


        {/* ======================================================
            CHART CONTROLS
        ====================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1

            rounded-xl
            border
            border-slate-700

            bg-slate-800/70

            p-1
          "
        >

          {chartTypes.map(
            (type) => {

              const Icon =
                icons[
                  type.value
                ];

              const active =
                chartType ===
                type.value;

              return (
                <button
                  key={
                    type.value
                  }
                  type="button"
                  onClick={() =>
                    onChartTypeChange?.(
                      type.value
                    )
                  }
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
                      active
                        ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                        : "text-slate-400 hover:bg-slate-700 hover:text-white"
                    }
                  `}
                  title={
                    type.label
                  }
                  aria-label={
                    type.label
                  }
                >
                  <Icon
                    className="h-4.5 w-4.5"
                  />
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

          p-4
          sm:p-6
        "
      >

        <div
          className="
            w-full
            min-w-0
            max-w-full
            overflow-hidden

            rounded-xl
            border
            border-slate-800

            bg-slate-950/40
          "
        >
          {renderChart()}
        </div>

      </div>

    </div>
  );
};


export default Visualization;