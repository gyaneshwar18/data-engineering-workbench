import { Database } from "lucide-react";

const ResultTable = ({
  columns = [],
  rows = [],
}) => {
  const hasData =
    columns.length > 0 &&
    rows.length > 0;

  return (
    <div
      className="
        block
        w-full
        min-w-0
        max-w-full

        overflow-hidden

        rounded-2xl
        border
        border-slate-700/50

        bg-slate-900/70
        backdrop-blur-xl
      "
    >
      {/* ================================================== */}
      {/* HEADER                                             */}
      {/* ================================================== */}

      <div
        className="
          flex
          w-full
          min-w-0

          items-center
          justify-between
          gap-4

          border-b
          border-slate-700/60

          bg-slate-800/40

          px-6
          py-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0

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

          <div className="min-w-0">
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
              shrink-0

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

      {/* ================================================== */}
      {/* TABLE VIEWPORT                                     */}
      {/* ================================================== */}

      {hasData ? (
        <div
          className="
            block
            w-full
            min-w-0
            max-w-full

            overflow-x-auto
            overflow-y-auto

            overscroll-x-contain
          "
        >
          <table
            className="
              w-max
              min-w-full
              border-collapse
            "
          >
            {/* ================================================== */}
            {/* TABLE HEADER                                       */}
            {/* ================================================== */}

            <thead>
              <tr className="bg-slate-800">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="
                      sticky
                      top-0
                      z-10

                      whitespace-nowrap

                      border-b
                      border-r
                      border-slate-700/60

                      bg-slate-800

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

            {/* ================================================== */}
            {/* TABLE BODY                                         */}
            {/* ================================================== */}

            <tbody>
              {rows.map(
                (row, rowIndex) => (
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
                    {columns.map(
                      (column) => {
                        const value =
                          row[column];

                        return (
                          <td
                            key={column}
                            className="
                              border-r
                              border-slate-800/60

                              px-5
                              py-3

                              text-sm
                              text-slate-300

                              last:border-r-0
                            "
                          >
                            <div
                              className="
                                max-w-[360px]

                                truncate
                                whitespace-nowrap
                              "
                              title={
                                value !==
                                  null &&
                                value !==
                                  undefined
                                  ? String(
                                      value
                                    )
                                  : "NULL"
                              }
                            >
                              {value !==
                                null &&
                              value !==
                                undefined ? (
                                String(
                                  value
                                )
                              ) : (
                                <span className="text-slate-600">
                                  NULL
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      }
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* ================================================== */
        /* EMPTY STATE                                        */
        /* ================================================== */

        <div
          className="
            flex
            h-64
            w-full
            min-w-0

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