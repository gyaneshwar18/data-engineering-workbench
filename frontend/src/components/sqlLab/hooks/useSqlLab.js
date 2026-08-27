  import {
    useCallback,
    useEffect,
    useState,
  } from "react";

  import sqlLabService from "../../../services/sqlLabService";

  const useSqlLab = () => {
    /* ================================================== */
    /* Editor                                             */
    /* ================================================== */

    const [sqlQuery, setSqlQuery] = useState("");
    const [loading, setLoading] = useState(false);

    /* ================================================== */
    /* Query Results                                      */
    /* ================================================== */

    const [result, setResult] = useState({
      columns: [],
      rows: [],
    });

    /* ================================================== */
    /* Visualization                                     */
    /* ================================================== */

    const [chartType, setChartType] = useState("bar");

    /* ================================================== */
    /* Database Metadata                                 */
    /* ================================================== */

    const [tables, setTables] = useState([]);
    const [columns, setColumns] = useState({});
    const [uploadedTable, setUploadedTable] = useState("");

    /* ================================================== */
    /* Query History                                      */
    /* ================================================== */

    const [queryHistory, setQueryHistory] = useState([]);

    /* ================================================== */
    /* Saved Queries                                      */
    /* ================================================== */

    const [savedQueries, setSavedQueries] = useState([]);

    /* ================================================== */
    /* Dialog State                                       */
    /* ================================================== */

    const [uploadOpen, setUploadOpen] = useState(false);
    const [tableExplorerOpen, setTableExplorerOpen] =
      useState(false);
    const [historyOpen, setHistoryOpen] =
      useState(false);
    const [savedQueriesOpen, setSavedQueriesOpen] =
      useState(false);

    /* ================================================== */
    /* Load Database Metadata                             */
    /* ================================================== */

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

    /* ================================================== */
    /* Load Query History                                 */
    /* ================================================== */

    const loadHistory = useCallback(async () => {
      try {
        const history =
          await sqlLabService.fetchHistory();

        setQueryHistory(
          Array.isArray(history)
            ? history
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load query history:",
          error
        );
      }
    }, []);

    /* ================================================== */
    /* Load Saved Queries                                 */
    /* ================================================== */

    const loadSavedQueries = useCallback(async () => {
      try {
        const queries =
          await sqlLabService.fetchSavedQueries();

        setSavedQueries(
          Array.isArray(queries)
            ? queries
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load saved queries:",
          error
        );
      }
    }, []);

    /* ================================================== */
    /* Initial Loading                                    */
    /* ================================================== */

    useEffect(() => {
      loadMetadata();
      loadHistory();
      loadSavedQueries();
    }, [
      loadMetadata,
      loadHistory,
      loadSavedQueries,
    ]);

    /* ================================================== */
    /* Run Query                                          */
    /* ================================================== */

    const runQuery = useCallback(async () => {
      const query = sqlQuery.trim();

      if (!query || loading) {
        return;
      }

      try {
        setLoading(true);

        const response =
          await sqlLabService.runQuery(query);

        setResult({
          columns: response?.columns || [],
          rows: response?.rows || [],
        });

        /*
        * The backend is now the source of truth
        * for query history.
        */
        await loadHistory();

        /*
        * Refresh metadata after schema changes.
        */
        const normalizedQuery =
          query.toLowerCase();

        const changesSchema =
          normalizedQuery.startsWith("create ") ||
          normalizedQuery.startsWith("alter ") ||
          normalizedQuery.startsWith("drop ") ||
          normalizedQuery.startsWith("truncate ");

        if (changesSchema) {
          await loadMetadata();
        }
      } catch (error) {
        console.error(
          "SQL query failed:",
          error
        );

        setResult({
          columns: [],
          rows: [],
        });

        /*
        * Even failed queries are stored by
        * the backend, so refresh history here too.
        */
        await loadHistory();
      } finally {
        setLoading(false);
      }
    }, [
      sqlQuery,
      loading,
      loadHistory,
      loadMetadata,
    ]);

    /* ================================================== */
    /* Save Query                                         */
    /* ================================================== */

    const saveQuery = useCallback(async () => {
      const query = sqlQuery.trim();

      if (!query) {
        return;
      }

      try {
        await sqlLabService.saveQuery(query);

        /*
        * Reload from backend so the real database
        * record becomes the frontend state.
        */
        await loadSavedQueries();
      } catch (error) {
        console.error(
          "Failed to save query:",
          error
        );
      }
    }, [
      sqlQuery,
      loadSavedQueries,
    ]);

    /* ================================================== */
    /* Upload Dataset                                     */
    /* ================================================== */

    const uploadDataset = useCallback(
      async (file) => {
        if (!file) {
          return;
        }

        try {
          setLoading(true);

          const response =
            await sqlLabService.uploadCSV(file);

          setUploadedTable(
            response?.table_name ||
            ""
          );

          await loadMetadata();
        } catch (error) {
          console.error(
            "Dataset upload failed:",
            error
          );
        } finally {
          setLoading(false);
        }
      },
      [loadMetadata]
    );

    /* ================================================== */
    /* Export CSV                                         */
    /* ================================================== */

    const escapeCSVValue = (value) => {
      if (
        value === null ||
        value === undefined ||
        value === ""
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

    const exportCSV = useCallback(() => {
      if (
        !result?.columns?.length ||
        !result?.rows?.length
      ) {
        return;
      }

      const headers =
        result.columns
          .map(escapeCSVValue)
          .join(",");

      const csvRows =
        result.rows.map((row) =>
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

      const blob = new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "query_result.csv";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    }, [result]);

    /* ================================================== */
    /* Dialog Controls                                    */
    /* ================================================== */

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

    /* ================================================== */
    /* Run History Query                                  */
    /* ================================================== */

    const runHistoryQuery = useCallback(
      async (query) => {
        const selectedQuery =
          query?.trim();

        if (!selectedQuery) {
          return;
        }

        setSqlQuery(selectedQuery);
        setHistoryOpen(false);

        try {
          setLoading(true);

          const response =
            await sqlLabService.runQuery(
              selectedQuery
            );

          setResult({
            columns:
              response?.columns || [],
            rows:
              response?.rows || [],
          });

          await loadHistory();
        } catch (error) {
          console.error(
            "History query failed:",
            error
          );

          setResult({
            columns: [],
            rows: [],
          });

          await loadHistory();
        } finally {
          setLoading(false);
        }
      },
      [loadHistory]
    );

    /* ================================================== */
    /* Run Saved Query                                    */
    /* ================================================== */

    const runSavedQuery = useCallback(
      async (query) => {
        const selectedQuery =
          query?.trim();

        if (!selectedQuery) {
          return;
        }

        setSqlQuery(selectedQuery);
        setSavedQueriesOpen(false);

        try {
          setLoading(true);

          const response =
            await sqlLabService.runQuery(
              selectedQuery
            );

          setResult({
            columns:
              response?.columns || [],
            rows:
              response?.rows || [],
          });

          await loadHistory();
        } catch (error) {
          console.error(
            "Saved query failed:",
            error
          );

          setResult({
            columns: [],
            rows: [],
          });

          await loadHistory();
        } finally {
          setLoading(false);
        }
      },
      [loadHistory]
    );

    /* ================================================== */
    /* Delete Saved Query                                 */
    /* ================================================== */

    const deleteSavedQuery =
      useCallback(
        async (id) => {
          try {
            await sqlLabService.deleteSavedQuery(
              id
            );

            await loadSavedQueries();
          } catch (error) {
            console.error(
              "Failed to delete saved query:",
              error
            );
          }
        },
        [loadSavedQueries]
      );

    /* ================================================== */
    /* Return                                             */
    /* ================================================== */

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

      /* Saved Queries */
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