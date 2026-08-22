const isNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return false;
  }

  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return false;
    }

    return Number.isFinite(Number(trimmed));
  }

  return false;
};


/* -------------------------------------------------- */
/* Find numeric columns                               */
/* -------------------------------------------------- */

const findNumericColumns = (columns, rows) => {
  if (!columns.length || !rows?.length) {
    return [];
  }

  return columns.filter((column) =>
    rows.some((row) => isNumber(row?.[column]))
  );
};


/* -------------------------------------------------- */
/* Find category column                               */
/* -------------------------------------------------- */

const findCategoryColumn = (
  columns,
  numericColumns
) => {
  return (
    columns.find(
      (column) => !numericColumns.includes(column)
    ) || columns[0]
  );
};


/* -------------------------------------------------- */
/* Prepare chart data                                 */
/* -------------------------------------------------- */

export const getChartData = (
  columns = [],
  rows = []
) => {
  if (!columns.length || !rows.length) {
    return {
      canRender: false,
      reason: "No data available.",
      data: [],
      categoryKey: "",
      numericKeys: [],
    };
  }

  const numericColumns = findNumericColumns(
    columns,
    rows
  );

  if (!numericColumns.length) {
    return {
      canRender: false,
      reason: "No numeric columns found.",
      data: [],
      categoryKey: "",
      numericKeys: [],
    };
  }

  const categoryColumn = findCategoryColumn(
    columns,
    numericColumns
  );

  return {
    canRender: true,
    data: rows,
    categoryKey: categoryColumn,
    numericKeys: numericColumns,
    reason: "",
  };
};


/* -------------------------------------------------- */
/* Supported chart types                              */
/* -------------------------------------------------- */

export const chartTypes = [
  {
    value: "bar",
    label: "Bar Chart",
  },
  {
    value: "line",
    label: "Line Chart",
  },
  {
    value: "area",
    label: "Area Chart",
  },
  {
    value: "pie",
    label: "Pie Chart",
  },
];


/* -------------------------------------------------- */
/* Pie chart data                                     */
/* -------------------------------------------------- */

export const getPieData = (
  data = [],
  categoryKey,
  numericKey
) => {
  if (!categoryKey || !numericKey) {
    return [];
  }

  return data
    .filter((item) =>
      isNumber(item?.[numericKey])
    )
    .map((item) => ({
      name:
        item?.[categoryKey] !== null &&
        item?.[categoryKey] !== undefined
          ? String(item[categoryKey])
          : "Unknown",

      value: Number(item[numericKey]),
    }));
};


/* -------------------------------------------------- */
/* Default chart type                                */
/* -------------------------------------------------- */

export const getDefaultChartType = (
  columns = [],
  rows = []
) => {
  const {
    canRender,
    numericKeys,
  } = getChartData(columns, rows);

  if (!canRender) {
    return null;
  }

  if (numericKeys.length === 1) {
    return "bar";
  }

  return "line";
};


/* -------------------------------------------------- */
/* Chart colors                                       */
/* -------------------------------------------------- */

export const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#14B8A6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];