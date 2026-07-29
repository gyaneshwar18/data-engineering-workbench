import { useState } from "react";

import {
  SqlLabHeader,
  FilterToolbar,
  ProblemsSidebar,
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
    // Problems
    problems,
    selectedProblem,

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
    selectProblem,
    runQuery,
    saveQuery,
    uploadDataset,
    exportCSV,

    // Query Actions
    runHistoryQuery,
    runSavedQuery,
    deleteSavedQuery,
  } = useSqlLab();

  const [search, setSearch] = useState("");

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-[1800px] space-y-6 px-6 py-8">
          {/* Header */}
          <SqlLabHeader />

          {/* Filters */}
          <FilterToolbar
            search={search}
            onSearchChange={setSearch}
          />

          {/* Main Workspace */}
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-3">
              <ProblemsSidebar
                problems={filteredProblems}
                selectedId={selectedProblem.id}
                onSelect={selectProblem}
              />
            </div>

            {/* Right */}
            <div className="col-span-9 space-y-5">
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
          </div>

          {/* Workspace */}
          <WorkspaceToolbar
            onUpload={openUpload}
            onTableExplorer={openExplorer}
            onHistory={openHistory}
            onSavedQueries={openSavedQueries}
          />

          {/* Result */}
          <ResultTable
            columns={result.columns}
            rows={result.rows}
          />

          {/* Visualization */}
          <Visualization
            columns={result.columns}
            rows={result.rows}
            chartType={chartType}
            onChartTypeChange={setChartType}
          />
        </div>
      </div>

      {/* Upload Dialog */}
      <UploadDatasetDialog
        open={uploadOpen}
        uploading={loading}
        uploadedTable={uploadedTable}
        onClose={closeUpload}
        onUpload={uploadDataset}
      />

      {/* Table Explorer */}
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

      {/* Query History */}
      <QueryHistoryDialog
        open={historyOpen}
        history={queryHistory}
        onClose={closeHistory}
        onRunAgain={runHistoryQuery}
      />

      {/* Saved Queries */}
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