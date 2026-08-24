import {
  SqlLabHeader,
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

    // Result
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
      {/* ================================================== */}
      {/* SQL LAB PAGE                                       */}
      {/* ================================================== */}

      <div
        className="
          min-h-screen
          w-full
          min-w-0
          overflow-x-hidden

          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-slate-950
        "
      >
        {/* ================================================== */}
        {/* MAIN CONTENT CONTAINER                             */}
        {/* ================================================== */}

        <main
          className="
            mx-auto
            w-full
            min-w-0
            max-w-[1800px]

            px-4
            py-6

            sm:px-6
          "
        >
          {/* ================================================== */}
          {/* CONTENT COLUMN                                     */}
          {/* ================================================== */}

          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              gap-5
            "
          >
            {/* ================================================== */}
            {/* HEADER                                             */}
            {/* ================================================== */}

            <section className="w-full min-w-0">
              <SqlLabHeader />
            </section>

            {/* ================================================== */}
            {/* EDITOR                                             */}
            {/* ================================================== */}

            <section
              className="
                flex
                w-full
                min-w-0
                flex-col
                gap-4
              "
            >
              <div className="w-full min-w-0">
                <SqlEditor
                  value={sqlQuery}
                  onChange={setSqlQuery}
                />
              </div>

              <div className="w-full min-w-0">
                <EditorToolbar
                  loading={loading}
                  onRun={runQuery}
                  onSave={saveQuery}
                  onExport={exportCSV}
                />
              </div>
            </section>

            {/* ================================================== */}
            {/* QUERY RESULTS                                     */}
            {/* ================================================== */}

            <section
              className="
                block
                w-full
                min-w-0
                max-w-full
              "
            >
              <ResultTable
                columns={result?.columns || []}
                rows={result?.rows || []}
              />
            </section>

            {/* ================================================== */}
            {/* WORKSPACE TOOLS                                   */}
            {/* ================================================== */}

            <section
              className="
                block
                w-full
                min-w-0
                max-w-full
              "
            >
              <WorkspaceToolbar
                onUpload={openUpload}
                onTableExplorer={openExplorer}
                onHistory={openHistory}
                onSavedQueries={openSavedQueries}
              />
            </section>

            {/* ================================================== */}
            {/* VISUALIZATION                                     */}
            {/* ================================================== */}

            <section
              className="
                block
                w-full
                min-w-0
                max-w-full
              "
            >
              <Visualization
                columns={result?.columns || []}
                rows={result?.rows || []}
                chartType={chartType}
                onChartTypeChange={setChartType}
              />
            </section>
          </div>
        </main>
      </div>

      {/* ====================================================== */}
      {/* UPLOAD DATASET                                        */}
      {/* ====================================================== */}

      <UploadDatasetDialog
        open={uploadOpen}
        uploading={loading}
        uploadedTable={uploadedTable}
        onClose={closeUpload}
        onUpload={uploadDataset}
      />

      {/* ====================================================== */}
      {/* TABLE EXPLORER                                        */}
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
      {/* QUERY HISTORY                                         */}
      {/* ====================================================== */}

      <QueryHistoryDialog
        open={historyOpen}
        history={queryHistory}
        onClose={closeHistory}
        onRunAgain={runHistoryQuery}
      />

      {/* ====================================================== */}
      {/* SAVED QUERIES                                         */}
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