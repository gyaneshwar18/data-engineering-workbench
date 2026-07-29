import { useEffect, useState, useCallback } from "react";
import sqlLabService from "../../../services/sqlLabService";

const DEFAULT_PROBLEMS = [
  {
    id: 1,
    title: "Top Customers by Revenue",
    category: "Aggregation",
    difficulty: "Medium",
    sql: `SELECT customer_id,
       SUM(amount) AS total
FROM orders
GROUP BY customer_id
ORDER BY total DESC
LIMIT 5;`,
  },
  {
    id: 2,
    title: "Rank Employees by Salary",
    category: "Window Function",
    difficulty: "Hard",
    sql: `SELECT name,
       salary,
       RANK() OVER (ORDER BY salary DESC) AS rnk
FROM employees;`,
  },
];

const useSqlLab = () => {
  // ===========================
  // State
  // ===========================

  const [problems] = useState(DEFAULT_PROBLEMS);

  const [selectedProblem, setSelectedProblem] = useState(
    DEFAULT_PROBLEMS[0]
  );

  const [sqlQuery, setSqlQuery] = useState(
    DEFAULT_PROBLEMS[0].sql
  );

  const [result, setResult] = useState({
    columns: [],
    rows: [],
  });

  const [loading, setLoading] = useState(false);

  const [chartType, setChartType] = useState("auto");

  const [uploadedTable, setUploadedTable] = useState("");

  const [tables, setTables] = useState([]);

  const [columns, setColumns] = useState({});

  // ===========================
  // Metadata
  // ===========================

  const loadMetadata = useCallback(async () => {
    try {
      const metadata =
        await sqlLabService.fetchMetadata();

      setTables(metadata.tables);

      setColumns(metadata.columns);
    } catch (error) {
      console.error("Metadata Error", error);
    }
  }, []);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  // ===========================
  // Problem Selection
  // ===========================

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setSqlQuery(problem.sql);

    setResult({
      columns: [],
      rows: [],
    });
  };

  // ===========================
  // Execute Query
  // ===========================

  const runQuery = async () => {
    if (!sqlQuery.trim()) return;

    setLoading(true);

    try {
      const response =
        await sqlLabService.runQuery(sqlQuery);

      setResult(response);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ??
          "Query execution failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Save Query
  // ===========================

  const saveQuery = async () => {
    try {
      await sqlLabService.saveQuery(sqlQuery);

      alert("Query saved successfully.");
    } catch {
      alert("Unable to save query.");
    }
  };

  // ===========================
  // Upload Dataset
  // ===========================

  const uploadDataset = async (file) => {
    if (!file) return;

    try {
      await sqlLabService.uploadCSV(file);

      setUploadedTable(
        file.name.replace(".csv", "").toLowerCase()
      );

      await loadMetadata();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ??
          "Upload failed."
      );
    }
  };

  // ===========================
  // Export CSV
  // ===========================

  const exportCSV = () => {
    if (!result.rows.length) return;

    const headers = result.columns.join(",");

    const data = result.rows.map((row) =>
      result.columns
        .map((column) => row[column])
        .join(",")
    );

    const csv = [headers, ...data].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "query_result.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return {
    // Data
    problems,
    selectedProblem,
    sqlQuery,
    result,
    loading,
    chartType,
    uploadedTable,
    tables,
    columns,

    // Setters
    setSqlQuery,
    setChartType,

    // Actions
    selectProblem,
    runQuery,
    saveQuery,
    uploadDataset,
    exportCSV,
    loadMetadata,
  };
};

export default useSqlLab;