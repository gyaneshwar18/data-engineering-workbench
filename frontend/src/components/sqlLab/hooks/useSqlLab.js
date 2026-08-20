import {
  SqlLabHeader,
  FilterToolbar,
  SqlEditor,
  EditorToolbar,
  WorkspaceToolbar,
  ResultTable,
  Visualization,
  UploadDatasetDialog,
  TableExplorerDialog,
  QueryHistoryDialog,
  SavedQueriesDialog,
} from "../components/sqlLab";

import useSqlLab from "../components/sqlLab/hooks/useSqlLab";

const SqlLab = () => {
  const {
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
  } = useSqlLab();

  return (
    <>
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-slate-950
        "
      >
        <div
          className="
            mx-auto
            max-w-[1800px]
            space-y-5
            px-6
            py-6
          "
        >

          {/* ================================================== */}
          {/* SQL LAB HEADER */}
          {/* ================================================== */}

          <SqlLabHeader />


          {/* ================================================== */}
          {/* FILTER / SEARCH BAR */}
          {/* ================================================== */}

          <FilterToolbar />


          {/* ================================================== */}
          {/* SQL EDITOR */}
          {/* ================================================== */}

          <div className="space-y-4">

            <SqlEditor
              value={sqlQuery}
              onChange={setSqlQuery}
            />

            <EditorToolbar
              loading={loading}
              onRun={runQuery}
              onSave={saveQuery}
              onExport={exportCSV}
            />

          </div>


          {/* ================================================== */}
          {/* QUERY RESULTS */}
          {/* ================================================== */}

          <ResultTable
            columns={result?.columns || []}
            rows={result?.rows || []}
          />


          {/* ================================================== */}
          {/* WORKSPACE TOOLS */}
          {/* ================================================== */}

          <WorkspaceToolbar
            onUpload={openUpload}
            onTableExplorer={openExplorer}
            onHistory={openHistory}
            onSavedQueries={openSavedQueries}
          />


          {/* ================================================== */}
          {/* VISUALIZATION */}
          {/* ================================================== */}

          <Visualization
            columns={result?.columns || []}
            rows={result?.rows || []}
            chartType={chartType}
            onChartTypeChange={setChartType}
          />

        </div>
      </div>


      {/* ====================================================== */}
      {/* UPLOAD DATASET DIALOG */}
      {/* ====================================================== */}

      <UploadDatasetDialog
        open={uploadOpen}
        uploading={loading}
        uploadedTable={uploadedTable}
        onClose={closeUpload}
        onUpload={uploadDataset}
      />


      {/* ====================================================== */}
      {/* TABLE EXPLORER */}
      {/* ====================================================== */}

      <TableExplorerDialog
        open={tableExplorerOpen}
        tables={tables}
        columns={columns}
        onClose={closeExplorer}
        onSelectTable={(query) => {
          setSqlQuery(query);
          closeExplorer();
        }}
      />


      {/* ====================================================== */}
      {/* QUERY HISTORY */}
      {/* ====================================================== */}

      <QueryHistoryDialog
        open={historyOpen}
        history={queryHistory}
        onClose={closeHistory}
        onRunAgain={runHistoryQuery}
      />


      {/* ====================================================== */}
      {/* SAVED QUERIES */}
      {/* ====================================================== */}

      <SavedQueriesDialog
        open={savedQueriesOpen}
        queries={savedQueries}
        onClose={closeSavedQueries}
        onSelect={runSavedQuery}
        onDelete={deleteSavedQuery}
      />

    </>
  );
};

export default SqlLab;