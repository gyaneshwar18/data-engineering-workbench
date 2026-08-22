import { useCallback, useEffect, useState } from "react";
import sqlLabService from "../../../services/sqlLabService";

const useSqlLab = () => {
  /* =========================================================
     Editor
  ========================================================= */

  const [sqlQuery, setSqlQuery] = useState("");

  const [loading, setLoading] = useState(false);

  /* =========================================================
     Query Results
  ========================================================= */

  const [result, setResult] = useState({
    columns: [],
    rows: [],
  });

  /* =========================================================
     Visualization
  ========================================================= */

  const [chartType, setChartType] = useState("bar");

  /* =========================================================
     Database Metadata
  ========================================================= */

  const [tables, setTables] = useState([]);

  const [columns, setColumns] = useState({});

  const [uploadedTable, setUploadedTable] = useState("");

  /* =========================================================
     Query History
  ========================================================= */

  const [queryHistory, setQueryHistory] = useState([]);

  /* =========================================================
     Saved Queries
  ========================================================= */

  const [savedQueries, setSavedQueries] = useState([]);

  /* =========================================================
     Dialog State
  ========================================================= */

  const [uploadOpen, setUploadOpen] = useState(false);

  const [tableExplorerOpen, setTableExplorerOpen] =
    useState(false);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [savedQueriesOpen, setSavedQueriesOpen] =
    useState(false);

  /* =========================================================
     Load Metadata
  ========================================================= */

  const loadMetadata = useCallback(async () => {
    try {
      const metadata =
        await sqlLabService.fetchMetadata();

      setTables(metadata.tables || []);
      setColumns(metadata.columns || {});
    } catch (error) {
      console.error(
        "Failed to load SQL Lab metadata:",
        error
      );
    }
  }, []);

  /* =========================================================
     Load History
  ========================================================= */

  const loadHistory = useCallback(async () => {
    try {
      const history =
        await sqlLabService.fetchHistory();

      setQueryHistory(history || []);
    } catch (error) {
      console.error(
        "Failed to load query history:",
        error
      );
    }
  }, []);

  /* =========================================================
     Load Saved Queries
  ========================================================= */

  const loadSavedQueries = useCallback(async () => {
    try {
      const queries =
        await sqlLabService.fetchSavedQueries();

      setSavedQueries(queries || []);
    } catch (error) {
      console.error(
        "Failed to load saved queries:",
        error
      );
    }
  }, []);

  /* =========================================================
     Initial Load
  ========================================================= */

  useEffect(() => {
    loadMetadata();
    loadHistory();
    loadSavedQueries();
  }, [
    loadMetadata,
    loadHistory,
    loadSavedQueries,
  ]);

  /* =========================================================
     Run Query
  ========================================================= */

  const runQuery = async () => {
    const query = sqlQuery.trim();

    if (!query || loading) return;

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(query);

      setResult({
        columns: response.columns || [],
        rows: response.rows || [],
      });

      // Backend already records history.
      // Refresh it instead of creating duplicate local history.
      await loadHistory();
    } catch (error) {
      console.error(
        "SQL query failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     Save Query
  ========================================================= */

  const saveQuery = async () => {
    const query = sqlQuery.trim();

    if (!query || loading) return;

    try {
      await sqlLabService.saveQuery(query);

      // Refresh from PostgreSQL.
      await loadSavedQueries();
    } catch (error) {
      console.error(
        "Failed to save query:",
        error
      );
    }
  };

  /* =========================================================
     Upload Dataset
  ========================================================= */

  const uploadDataset = async (file) => {
    if (!file || loading) return;

    try {
      setLoading(true);

      const response =
        await sqlLabService.uploadCSV(file);

      setUploadedTable(
        response.table_name || ""
      );

      // New table is now available.
      await loadMetadata();

      // Close dialog after successful upload.
      setUploadOpen(false);
    } catch (error) {
      console.error(
        "Dataset upload failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     Export CSV
  ========================================================= */

  const exportCSV = () => {
    if (!result.columns.length || !result.rows.length) {
      return;
    }

    const escapeCSV = (value) => {
      if (
        value === null ||
        value === undefined
      ) {
        return "";
      }

      const stringValue = String(value);

      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replaceAll(
          '"',
          '""'
        )}"`;
      }

      return stringValue;
    };

    const headers = result.columns
      .map(escapeCSV)
      .join(",");

    const csvRows = result.rows.map((row) =>
      result.columns
        .map((column) =>
          escapeCSV(row[column])
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

  /* =========================================================
     Dialog Controls
  ========================================================= */

  const openUpload = () =>
    setUploadOpen(true);

  const closeUpload = () =>
    setUploadOpen(false);

  const openExplorer = () =>
    setTableExplorerOpen(true);

  const closeExplorer = () =>
    setTableExplorerOpen(false);

  const openHistory = async () => {
    await loadHistory();
    setHistoryOpen(true);
  };

  const closeHistory = () =>
    setHistoryOpen(false);

  const openSavedQueries = async () => {
    await loadSavedQueries();
    setSavedQueriesOpen(true);
  };

  const closeSavedQueries = () =>
    setSavedQueriesOpen(false);

  /* =========================================================
     Run History Query
  ========================================================= */

  const runHistoryQuery = async (query) => {
    const trimmedQuery = query?.trim();

    if (!trimmedQuery || loading) return;

    setSqlQuery(trimmedQuery);

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(
          trimmedQuery
        );

      setResult({
        columns: response.columns || [],
        rows: response.rows || [],
      });

      await loadHistory();

      setHistoryOpen(false);
    } catch (error) {
      console.error(
        "History query failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     Run Saved Query
  ========================================================= */

  const runSavedQuery = async (query) => {
    const trimmedQuery = query?.trim();

    if (!trimmedQuery || loading) return;

    setSqlQuery(trimmedQuery);

    try {
      setLoading(true);

      const response =
        await sqlLabService.runQuery(
          trimmedQuery
        );

      setResult({
        columns: response.columns || [],
        rows: response.rows || [],
      });

      await loadHistory();

      setSavedQueriesOpen(false);
    } catch (error) {
      console.error(
        "Saved query failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     Delete Saved Query
  ========================================================= */

  const deleteSavedQuery = async (id) => {
    try {
      await sqlLabService.deleteSavedQuery(id);

      await loadSavedQueries();
    } catch (error) {
      console.error(
        "Failed to delete saved query:",
        error
      );
    }
  };

  /* =========================================================
     Toggle Pin
  ========================================================= */

  const togglePin = async (id) => {
    try {
      await sqlLabService.togglePin(id);

      await loadSavedQueries();
    } catch (error) {
      console.error(
        "Failed to update saved query:",
        error
      );
    }
  };

  /* =========================================================
     Return
  ========================================================= */

  return {
    // Editor
    sqlQuery,
    setSqlQuery,

    // Results
    result,
    loading,

    // Charts
    chartType,
    setChartType,

    // Metadata
    tables,
    columns,
    uploadedTable,

    // History
    queryHistory,

    // Saved Queries
    savedQueries,

    // Dialog State
    uploadOpen,
    tableExplorerOpen,
    historyOpen,
    savedQueriesOpen,

    // Dialog Actions
    openUpload,
    closeUpload,

    openExplorer,
    closeExplorer,

    openHistory,
    closeHistory,

    openSavedQueries,
    closeSavedQueries,

    // SQL Actions
    runQuery,
    saveQuery,
    uploadDataset,
    exportCSV,

    // Query Actions
    runHistoryQuery,
    runSavedQuery,
    deleteSavedQuery,
    togglePin,
  };
};

export default useSqlLab;