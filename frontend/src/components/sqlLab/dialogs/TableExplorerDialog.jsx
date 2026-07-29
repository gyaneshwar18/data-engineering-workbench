import {
  Database,
  Table2,
  Columns3,
  X,
} from "lucide-react";

const TableExplorerDialog = ({
  open = false,
  tables = [],
  columns = {},
  onClose = () => {},
  onSelectTable = () => {},
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <Database className="h-6 w-6 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Table Explorer
              </h2>

              <p className="text-sm text-slate-400">
                Browse available tables and their columns.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Tables */}
          <div className="w-72 overflow-y-auto border-r border-slate-700 bg-slate-900">
            <div className="border-b border-slate-700 px-5 py-4">
              <h3 className="text-sm font-semibold text-white">
                Tables
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {tables.length} Available
              </p>
            </div>

            <div className="space-y-2 p-4">
              {tables.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No tables found.
                </p>
              ) : (
                tables.map((table) => (
                  <button
                    key={table}
                    onClick={() =>
                      onSelectTable(
                        `SELECT * FROM ${table} LIMIT 100;`
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/40 px-4 py-3 text-left transition hover:border-cyan-500/40 hover:bg-slate-800"
                  >
                    <Table2 className="h-5 w-5 text-cyan-400" />

                    <span className="text-sm font-medium text-white">
                      {table}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Columns */}
          <div className="flex-1 overflow-y-auto bg-slate-900">
            <div className="border-b border-slate-700 px-6 py-4">
              <h3 className="text-sm font-semibold text-white">
                Table Schema
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Columns grouped by table
              </p>
            </div>

            <div className="space-y-6 p-6">
              {Object.keys(columns).length === 0 ? (
                <div className="flex h-full items-center justify-center py-20">
                  <p className="text-slate-500">
                    No schema available.
                  </p>
                </div>
              ) : (
                Object.entries(columns).map(
                  ([tableName, tableColumns]) => (
                    <div
                      key={tableName}
                      className="rounded-2xl border border-slate-700 bg-slate-800/30"
                    >
                      <div className="border-b border-slate-700 px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-cyan-400" />

                          <h4 className="font-semibold text-white">
                            {tableName}
                          </h4>
                        </div>
                      </div>

                      <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-3">
                        {tableColumns.map((column) => (
                          <div
                            key={column}
                            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3"
                          >
                            <Columns3 className="h-4 w-4 text-emerald-400" />

                            <span className="text-sm text-slate-300">
                              {column}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-700 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableExplorerDialog;