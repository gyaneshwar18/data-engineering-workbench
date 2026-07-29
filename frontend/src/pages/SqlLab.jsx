import {
  SqlLabHeader,
  FilterToolbar,
  ProblemsSidebar,
  SqlEditor,
  EditorToolbar,
  WorkspaceToolbar,
  ResultTable,
  Visualization,
} from "../components/sqlLab";

import useSqlLab from "../components/sqlLab/hooks/useSqlLab";

const SqlLab = () => {
  const {
    // Data
    problems,
    selectedProblem,
    sqlQuery,
    result,
    loading,
    chartType,

    // Actions
    setSqlQuery,
    setChartType,
    selectProblem,
    runQuery,
    saveQuery,
    exportCSV,
  } = useSqlLab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-[1700px] space-y-6 px-6 py-8">
        {/* Header */}
        <SqlLabHeader />

        {/* Filters */}
        <FilterToolbar />

        {/* Main Workspace */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <ProblemsSidebar
              problems={problems}
              selectedId={selectedProblem.id}
              onSelect={selectProblem}
            />
          </div>

          {/* Editor */}
          <div className="col-span-9 space-y-4">
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
        <WorkspaceToolbar />

        {/* Results */}
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
  );
};

export default SqlLab;