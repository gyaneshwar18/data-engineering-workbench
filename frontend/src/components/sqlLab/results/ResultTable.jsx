import { Database } from "lucide-react";

const ResultTable = ({
  columns = [],
  rows = [],
}) => {
  const hasData =
    columns.length > 0 && rows.length > 0;

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-700/60
        bg-slate-900
        shadow-xl
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-700/60
          bg-slate-800/40
          px-6
          py-4
        "
      >
        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-500/20
              bg-cyan-500/10
            "
          >
            <Database className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Query Results
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {hasData
                ? `${rows.length} rows returned`
                : "Execute a query to view results"}
            </p>
          </div>

        </div>

        {hasData && (
          <div
            className="
              rounded-lg
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-3
              py-1
            "
          >
            <span className="text-xs font-medium text-emerald-400">
              Success
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      {hasData ? (
        <div
          className="
            max-h-[520px]
            overflow-auto
          "
        >
          <table className="min-w-full border-collapse">

            {/* Header */}
            <thead className="sticky top-0 z-10">

              <tr className="bg-slate-800/90">

                {columns.map((column) => (
                  <th
                    key={column}
                    className="
                      whitespace-nowrap
                      border-b
                      border-r
                      border-slate-700/60
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-300
                      last:border-r-0
                    "
                  >
                    {column}
                  </th>
                ))}

              </tr>

            </thead>

            {/* Rows */}
            <tbody>

              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="
                    border-b
                    border-slate-800
                    transition-colors
                    hover:bg-slate-800/50
                    last:border-b-0
                  "
                >

                  {columns.map((column) => (
                    <td
                      key={column}
                      className="
                        whitespace-nowrap
                        border-r
                        border-slate-800/60
                        px-5
                        py-3
                        text-sm
                        text-slate-300
                        last:border-r-0
                      "
                    >
                      {row[column] !== null &&
                      row[column] !== undefined ? (
                        String(row[column])
                      ) : (
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
        /* Empty State */
        <div
          className="
            flex
            h-64
            flex-col
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-slate-700
              bg-slate-800/60
            "
          >
            <Database className="h-5 w-5 text-slate-500" />
          </div>

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