import { useCallback, useEffect, useState } from "react";
import sqlLabService from "../../../services/sqlLabService";

const useSqlLab = () => {
  /* ---------------------------------- */
  /* Editor                             */
  /* ---------------------------------- */

  const [sqlQuery, setSqlQuery] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------------------------- */
  /* Query Results                      */
  /* ---------------------------------- */

  const [result, setResult] = useState({
    columns: [],
    rows: [],
  });

  /* ---------------------------------- */
  /* Visualization                     */
  /* ---------------------------------- */

  const [chartType, setChartType] = useState("bar");

  /* ---------------------------------- */
  /* Database Metadata                  */
  /* ---------------------------------- */

  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState({});
  const [uploadedTable, setUploadedTable] = useState("");

  /* ---------------------------------- */
  /* Query History                      */
  /* ---------------------------------- */

  const [queryHistory, setQueryHistory] = useState([]);

  /* ---------------------------------- */
  /* Saved Queries                      */
  /* ---------------------------------- */

  const [savedQueries, setSavedQueries] = useState([]);

  /* ---------------------------------- */
  /* Dialog State                       */
  /* ---------------------------------- */

  const [uploadOpen, setUploadOpen] = useState(false);
  const [tableExplorerOpen, setTableExplorerOpen] =
    useState(false);
  const [historyOpen, setHistoryOpen] =
    useState(false);
  const [savedQueriesOpen, setSavedQueriesOpen] =
    useState(false);

  /* ---------------------------------- */
  /* Load Database Metadata             */
  /* ---------------------------------- */

  const loadMetadata = useCallback(async () => {
    try {
      const metadata =
        await sqlLabService.fetchMetadata();

      setTables(metadata?.tables || []);
      setColumns(metadata?.columns || {});
    } catch (error) {
      console.error(
        "Failed to load database metadata:",
        error
      );
    }
  }, []);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  /* ---------------------------------- */
  /* Add Query To History               */
  /* ---------------------------------- */

  const addToHistory = useCallback((query) => {
    setQueryHistory((previous) => [
      {
        id: Date.now(),
        query,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
      ...previous,
    ]);
  }, []);

  /* ---------------------------------- */
  /* Run Query                          */
  /* ---------------------------------- */

  const runQuery = useCallback(async () => {
    const query = sqlQuery.trim();

    if (!query || loading) return;

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(query);

      setResult({
        columns: response?.columns || [],
        rows: response?.rows || [],
      });

      addToHistory(query);

      /*
       * Refresh metadata after schema-changing queries.
       * This keeps Table Explorer and table suggestions
       * synchronized with the database.
       */
      const normalizedQuery = query.toLowerCase();

      const changesSchema =
        normalizedQuery.startsWith("create ") ||
        normalizedQuery.startsWith("alter ") ||
        normalizedQuery.startsWith("drop ") ||
        normalizedQuery.startsWith("truncate ");

      if (changesSchema) {
        await loadMetadata();
      }
    } catch (error) {
      console.error("SQL query failed:", error);

      /*
       * Clear previous results when the query fails.
       * This prevents old results from looking like
       * the result of the failed query.
       */
      setResult({
        columns: [],
        rows: [],
      });
    } finally {
      setLoading(false);
    }
  }, [
    sqlQuery,
    loading,
    addToHistory,
    loadMetadata,
  ]);

  /* ---------------------------------- */
  /* Save Query                         */
  /* ---------------------------------- */

  const saveQuery = async () => {
    const query = sqlQuery.trim();

    if (!query) return;

    try {
      await sqlLabService.saveQuery(query);

      setSavedQueries((previous) => [
        {
          id: Date.now(),
          query,
          saved_at: new Date().toLocaleString(),
        },
        ...previous,
      ]);
    } catch (error) {
      console.error(
        "Failed to save query:",
        error
      );
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
        response?.table_name || ""
      );

      /*
       * New CSV table should immediately become
       * available inside Table Explorer and
       * SQL autocomplete.
       */
      await loadMetadata();
    } catch (error) {
      console.error(
        "Dataset upload failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* Export CSV                         */
  /* ---------------------------------- */

  const escapeCSVValue = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    const stringValue = String(value);

    /*
     * Escape values containing:
     * comma, quote, or newline.
     */
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replaceAll('"', '""')}"`;
    }

    return stringValue;
  };

  const exportCSV = () => {
    if (
      !result?.columns?.length ||
      !result?.rows?.length
    ) {
      return;
    }

    const headers = result.columns
      .map(escapeCSVValue)
      .join(",");

    const csvRows = result.rows.map((row) =>
      result.columns
        .map((column) =>
          escapeCSVValue(row[column])
        )
        .join(",")
    );

    const csv = [
      headers,
      ...csvRows,
    ].join("\n");

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

  const openUpload = () =>
    setUploadOpen(true);

  const closeUpload = () =>
    setUploadOpen(false);

  const openExplorer = () =>
    setTableExplorerOpen(true);

  const closeExplorer = () =>
    setTableExplorerOpen(false);

  const openHistory = () =>
    setHistoryOpen(true);

  const closeHistory = () =>
    setHistoryOpen(false);

  const openSavedQueries = () =>
    setSavedQueriesOpen(true);

  const closeSavedQueries = () =>
    setSavedQueriesOpen(false);

  /* ---------------------------------- */
  /* Run History Query                  */
  /* ---------------------------------- */

  const runHistoryQuery = async (query) => {
    const selectedQuery = query?.trim();

    if (!selectedQuery) return;

    setSqlQuery(selectedQuery);
    setHistoryOpen(false);

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(
          selectedQuery
        );

      setResult({
        columns: response?.columns || [],
        rows: response?.rows || [],
      });
    } catch (error) {
      console.error(
        "History query failed:",
        error
      );

      setResult({
        columns: [],
        rows: [],
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* Run Saved Query                    */
  /* ---------------------------------- */

  const runSavedQuery = async (query) => {
    const selectedQuery = query?.trim();

    if (!selectedQuery) return;

    setSqlQuery(selectedQuery);
    setSavedQueriesOpen(false);

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(
          selectedQuery
        );

      setResult({
        columns: response?.columns || [],
        rows: response?.rows || [],
      });
    } catch (error) {
      console.error(
        "Saved query failed:",
        error
      );

      setResult({
        columns: [],
        rows: [],
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* Delete Saved Query                 */
  /* ---------------------------------- */

  const deleteSavedQuery = (id) => {
    setSavedQueries((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  /* ---------------------------------- */
  /* Return                             */
  /* ---------------------------------- */

  return {
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