const isNumber = (value) => {
  return value !== null && value !== "" && !Number.isNaN(Number(value));
};

const findNumericColumns = (columns, rows) => {
  if (!rows?.length) return [];

  return columns.filter((column) =>
    rows.some((row) => isNumber(row[column]))
  );
};

const findCategoryColumn = (columns, numericColumns) => {
  return (
    columns.find((column) => !numericColumns.includes(column)) ||
    columns[0]
  );
};

export const getChartData = (columns = [], rows = []) => {
  if (!columns.length || !rows.length) {
    return {
      canRender: false,
      reason: "No data available.",
      data: [],
      categoryKey: "",
      numericKeys: [],
    };
  }

  const numericColumns = findNumericColumns(columns, rows);

  if (numericColumns.length === 0) {
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

export const getPieData = (
  data,
  categoryKey,
  numericKey
) => {
  return data.map((item) => ({
    name: item[categoryKey],
    value: Number(item[numericKey]),
  }));
};

export const getDefaultChartType = (
  columns,
  rows
) => {
  const { canRender, numericKeys } = getChartData(
    columns,
    rows
  );

  if (!canRender) return null;

  if (numericKeys.length === 1) return "bar";

  return "line";
};

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