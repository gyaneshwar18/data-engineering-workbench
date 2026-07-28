import { Database } from "lucide-react";

const ResultTable = ({
  columns = [],
  rows = [],
}) => {
  const hasData =
    columns.length > 0 && rows.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
            <Database className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Query Results
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {hasData
                ? `${rows.length} rows returned`
                : "Execute a query to view results"}
            </p>
          </div>
        </div>

        {hasData && (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
            <span className="text-xs font-medium text-emerald-400">
              Success
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      {hasData ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-800/70">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="whitespace-nowrap border-b border-slate-700/50 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-slate-800 transition hover:bg-slate-800/40"
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="whitespace-nowrap px-5 py-3 text-sm text-slate-300"
                    >
                      {row[column] !== null &&
                      row[column] !== undefined
                        ? String(row[column])
                        : (
                            <span className="text-slate-600">
                              NULL
                            </span>
                          )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center px-6 text-center">
          <Database className="mb-4 h-12 w-12 text-slate-600" />

          <h3 className="text-lg font-semibold text-slate-300">
            No Results Yet
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Write a SQL query and click
            <span className="mx-1 font-medium text-cyan-400">
              Run Query
            </span>
            to view the results here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultTable;