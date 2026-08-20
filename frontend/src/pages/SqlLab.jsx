import { useMemo, useState } from "react";

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

  // ------------------------------------------------------------
  // Filter State
  // ------------------------------------------------------------

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  // ------------------------------------------------------------
  // Filter Problems
  // ------------------------------------------------------------

  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return problems.filter((problem) => {
      // Search
      const matchesSearch =
        !query ||
        problem.title?.toLowerCase().includes(query) ||
        problem.category?.toLowerCase().includes(query) ||
        problem.description?.toLowerCase().includes(query);

      // Category
      const matchesCategory =
        category === "all" ||
        problem.category?.toLowerCase() ===
          category.toLowerCase();

      // Difficulty
      const matchesDifficulty =
        difficulty === "all" ||
        problem.difficulty?.toLowerCase() ===
          difficulty.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty
      );
    });
  }, [problems, search, category, difficulty]);

  // ------------------------------------------------------------
  // Reset Filters
  // ------------------------------------------------------------

  const handleResetFilters = () => {
    setSearch("");
    setCategory("all");
    setDifficulty("all");
  };

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
          {/* Header */}
          {/* ================================================== */}

          <SqlLabHeader />


          {/* ================================================== */}
          {/* Filters */}
          {/* ================================================== */}

          <FilterToolbar
            search={search}
            onSearchChange={setSearch}

            category={category}
            onCategoryChange={setCategory}

            difficulty={difficulty}
            onDifficultyChange={setDifficulty}

            onReset={handleResetFilters}

            problemCount={filteredProblems.length}
          />


          {/* ================================================== */}
          {/* Main SQL Workspace */}
          {/* ================================================== */}

          <div
            className="
              grid
              grid-cols-12
              gap-5
              items-start
            "
          >

            {/* ------------------------------------------------ */}
            {/* SQL Problems */}
            {/* ------------------------------------------------ */}

            <div
              className="
                col-span-12
                lg:col-span-3
                min-w-0
              "
            >
              <ProblemsSidebar
                problems={filteredProblems}
                selectedId={selectedProblem?.id}
                onSelect={selectProblem}
              />
            </div>


            {/* ------------------------------------------------ */}
            {/* SQL Editor */}
            {/* ------------------------------------------------ */}

            <div
              className="
                col-span-12
                lg:col-span-9
                min-w-0
                space-y-4
              "
            >

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


          {/* ================================================== */}
          {/* Workspace Tools */}
          {/* ================================================== */}

          <WorkspaceToolbar
            onUpload={openUpload}
            onTableExplorer={openExplorer}
            onHistory={openHistory}
            onSavedQueries={openSavedQueries}
          />


          {/* ================================================== */}
          {/* Query Results */}
          {/* ================================================== */}

          <ResultTable
            columns={result?.columns || []}
            rows={result?.rows || []}
          />


          {/* ================================================== */}
          {/* Visualization */}
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
      {/* Upload Dataset Dialog */}
      {/* ====================================================== */}

      <UploadDatasetDialog
        open={uploadOpen}
        uploading={loading}
        uploadedTable={uploadedTable}
        onClose={closeUpload}
        onUpload={uploadDataset}
      />


      {/* ====================================================== */}
      {/* Table Explorer */}
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
      {/* Query History */}
      {/* ====================================================== */}

      <QueryHistoryDialog
        open={historyOpen}
        history={queryHistory}
        onClose={closeHistory}
        onRunAgain={runHistoryQuery}
      />


      {/* ====================================================== */}
      {/* Saved Queries */}
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