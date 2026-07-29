import { useCallback, useEffect, useState } from "react";
import sqlLabService from "../../../services/sqlLabService";

const sampleProblems = [
  {
    id: 1,
    title: "Select All Employees",
    difficulty: "Easy",
    category: "SELECT",
    query: "SELECT * FROM employees LIMIT 10;",
  },
  {
    id: 2,
    title: "Department Wise Salary",
    difficulty: "Medium",
    category: "GROUP BY",
    query: `SELECT department,
AVG(salary) AS average_salary
FROM employees
GROUP BY department;`,
  },
  {
    id: 3,
    title: "Top 5 Highest Salaries",
    difficulty: "Easy",
    category: "ORDER BY",
    query: `SELECT *
FROM employees
ORDER BY salary DESC
LIMIT 5;`,
  },
];

const useSqlLab = () => {
  /* ---------------------------------- */
  /* State                              */
  /* ---------------------------------- */

  const [problems] = useState(sampleProblems);

  const [selectedProblem, setSelectedProblem] = useState(
    sampleProblems[0]
  );

  const [sqlQuery, setSqlQuery] = useState(
    sampleProblems[0].query
  );

  const [loading, setLoading] = useState(false);

  const [chartType, setChartType] = useState("bar");

  const [result, setResult] = useState({
    columns: [],
    rows: [],
  });

  const [tables, setTables] = useState([]);

  const [columns, setColumns] = useState({});

  const [uploadedTable, setUploadedTable] = useState("");

  const [queryHistory, setQueryHistory] = useState([]);

  const [savedQueries, setSavedQueries] = useState([]);

  /* ---------------------------------- */
  /* Dialog State                       */
  /* ---------------------------------- */

  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [tableExplorerOpen, setTableExplorerOpen] =
    useState(false);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [savedQueriesOpen, setSavedQueriesOpen] =
    useState(false);

  /* ---------------------------------- */
  /* Load Metadata                      */
  /* ---------------------------------- */

  const loadMetadata = useCallback(async () => {
    try {
      const metadata =
        await sqlLabService.fetchMetadata();

      setTables(metadata.tables || []);
      setColumns(metadata.columns || {});
    } catch (error) {
      console.error(
        "Failed to load metadata",
        error
      );
    }
  }, []);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  /* ---------------------------------- */
  /* Problem Selection                  */
  /* ---------------------------------- */

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setSqlQuery(problem.query);
  };

  /* ---------------------------------- */
  /* Run Query                          */
  /* ---------------------------------- */

  const runQuery = async () => {
    if (!sqlQuery.trim()) return;

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(sqlQuery);

      setResult({
        columns: response.columns || [],
        rows: response.rows || [],
      });

      setQueryHistory((previous) => [
        {
          id: Date.now(),
          query: sqlQuery,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
        ...previous,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* Save Query                         */
  /* ---------------------------------- */

  const saveQuery = async () => {
    if (!sqlQuery.trim()) return;

    try {
      await sqlLabService.saveQuery(sqlQuery);

      setSavedQueries((previous) => [
        {
          id: Date.now(),
          query: sqlQuery,
          saved_at:
            new Date().toLocaleString(),
        },
        ...previous,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------------------------- */
  /* Upload Dataset                     */
  /* ---------------------------------- */

  const uploadDataset = async (file) => {
    if (!file) return;

    try {
      setLoading(true);

      const response =
        await sqlLabService.uploadCSV(file);

      setUploadedTable(
        response.table_name || ""
      );

      await loadMetadata();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* Export CSV                         */
  /* ---------------------------------- */

  const exportCSV = () => {
    if (!result.rows.length) return;

    const headers = result.columns.join(",");

    const csvRows = result.rows.map((row) =>
      result.columns
        .map((column) => row[column])
        .join(",")
    );

    const csv = [headers, ...csvRows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "query_result.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

    /* ---------------------------------- */
  /* Dialog Controls                    */
  /* ---------------------------------- */

  const openUpload = () => setUploadOpen(true);
  const closeUpload = () => setUploadOpen(false);

  const openExplorer = () =>
    setTableExplorerOpen(true);
  const closeExplorer = () =>
    setTableExplorerOpen(false);

  const openHistory = () => setHistoryOpen(true);
  const closeHistory = () => setHistoryOpen(false);

  const openSavedQueries = () =>
    setSavedQueriesOpen(true);
  const closeSavedQueries = () =>
    setSavedQueriesOpen(false);

  /* ---------------------------------- */
  /* History Actions                    */
  /* ---------------------------------- */

  const runHistoryQuery = async (query) => {
    setSqlQuery(query);

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(query);

      setResult({
        columns: response.columns || [],
        rows: response.rows || [],
      });

      setHistoryOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* Saved Query Actions                */
  /* ---------------------------------- */

  const runSavedQuery = async (query) => {
    setSqlQuery(query);

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(query);

      setResult({
        columns: response.columns || [],
        rows: response.rows || [],
      });

      setSavedQueriesOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSavedQuery = (id) => {
    setSavedQueries((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  /* ---------------------------------- */
  /* Return                             */
  /* ---------------------------------- */

  return {
    /* Problems */
    problems,
    selectedProblem,

    /* Editor */
    sqlQuery,
    setSqlQuery,

    /* Results */
    result,
    loading,

    /* Charts */
    chartType,
    setChartType,

    /* Metadata */
    tables,
    columns,
    uploadedTable,

    /* History */
    queryHistory,
    savedQueries,

    /* Dialog State */
    uploadOpen,
    tableExplorerOpen,
    historyOpen,
    savedQueriesOpen,

    /* Dialog Actions */
    openUpload,
    closeUpload,

    openExplorer,
    closeExplorer,

    openHistory,
    closeHistory,

    openSavedQueries,
    closeSavedQueries,

    /* SQL Actions */
    selectProblem,
    runQuery,
    saveQuery,
    uploadDataset,
    exportCSV,

    /* Query Actions */
    runHistoryQuery,
    runSavedQuery,
    deleteSavedQuery,
  };
};

export default useSqlLab;