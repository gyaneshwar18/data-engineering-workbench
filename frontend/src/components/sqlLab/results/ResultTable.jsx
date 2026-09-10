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

        rounded-xl
        border
        border-slate-700/50

        bg-slate-900/70
        backdrop-blur-xl

        sm:rounded-2xl
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
          gap-3

          border-b
          border-slate-700/60

          bg-slate-800/40

          px-3.5
          py-3

          sm:gap-4
          sm:px-6
          sm:py-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-2.5

            sm:gap-3
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0

              items-center
              justify-center

              rounded-lg
              border
              border-cyan-500/20
              bg-cyan-500/10

              sm:h-10
              sm:w-10
              sm:rounded-xl
            "
          >
            <Database
              className="
                h-4
                w-4
                text-cyan-400

                sm:h-5
                sm:w-5
              "
            />
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-xs
                font-semibold
                text-white

                sm:text-sm
              "
            >
              Query Results
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[10px]
                text-slate-400

                sm:mt-1
                sm:text-sm
              "
            >
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

              rounded-md
              border
              border-emerald-500/20
              bg-emerald-500/10

              px-2
              py-0.5

              sm:rounded-lg
              sm:px-3
              sm:py-1
            "
          >
            <span
              className="
                text-[9px]
                font-medium
                text-emerald-400

                sm:text-xs
              "
            >
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

                      px-3
                      py-2.5

                      text-left
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-300

                      last:border-r-0

                      sm:px-5
                      sm:py-3
                      sm:text-xs
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

                              px-3
                              py-2.5

                              text-xs
                              text-slate-300

                              last:border-r-0

                              sm:px-5
                              sm:py-3
                              sm:text-sm
                            "
                          >
                            <div
                              className="
                                max-w-[240px]

                                truncate
                                whitespace-nowrap

                                sm:max-w-[360px]
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
            h-56
            w-full
            min-w-0

            flex-col
            items-center
            justify-center

            px-4
            text-center

            sm:h-64
            sm:px-6
          "
        >
          <div
            className="
              mb-3

              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-lg
              border
              border-slate-700
              bg-slate-800/60

              sm:mb-4
              sm:h-12
              sm:w-12
              sm:rounded-xl
            "
          >
            <Database
              className="
                h-4
                w-4
                text-slate-500

                sm:h-5
                sm:w-5
              "
            />
          </div>

          <h3
            className="
              text-base
              font-semibold
              text-slate-300

              sm:text-lg
            "
          >
            No Results Yet
          </h3>

          <p
            className="
              mt-1.5
              max-w-md
              text-xs
              leading-5
              text-slate-500

              sm:mt-2
              sm:text-sm
              sm:leading-6
            "
          >
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