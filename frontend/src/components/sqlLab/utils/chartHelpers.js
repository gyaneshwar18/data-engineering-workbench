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

const SqlLab = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-[1700px] px-6 py-8 space-y-6">
        {/* Header */}
        <SqlLabHeader />

        {/* Filters */}
        <FilterToolbar />

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Problems Sidebar */}
          <div className="col-span-3">
            <ProblemsSidebar />
          </div>

          {/* SQL Editor */}
          <div className="col-span-9 space-y-4">
            <SqlEditor />

            <EditorToolbar />
          </div>
        </div>

        {/* Workspace Tools */}
        <WorkspaceToolbar />

        {/* Results */}
        <ResultTable />

        {/* Visualization */}
        <Visualization />
      </div>
    </div>
  );
};

export default SqlLab;