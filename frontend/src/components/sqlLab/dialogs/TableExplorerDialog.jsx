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
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/70
        p-2
        backdrop-blur-sm

        sm:p-4
      "
    >
      <div
        className="
          flex
          h-[94vh]
          w-full
          max-w-5xl
          min-w-0
          flex-col
          overflow-hidden

          rounded-xl
          border
          border-slate-700
          bg-slate-900
          shadow-2xl

          sm:h-[88vh]
          sm:rounded-2xl
        "
      >
        {/* ================================================== */}
        {/* HEADER                                             */}
        {/* ================================================== */}

        <div
          className="
            flex
            min-w-0
            shrink-0
            items-center
            justify-between
            gap-3

            border-b
            border-slate-700

            px-3.5
            py-3

            sm:px-6
            sm:py-5
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

                sm:h-12
                sm:w-12
                sm:rounded-xl
              "
            >
              <Database
                className="
                  h-4
                  w-4
                  text-cyan-400

                  sm:h-6
                  sm:w-6
                "
              />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-white

                  sm:text-lg
                "
              >
                Table Explorer
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-slate-400

                  sm:text-sm
                "
              >
                Browse available tables and their columns.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Table Explorer"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center

              rounded-lg
              text-slate-400

              transition-colors

              hover:bg-slate-800
              hover:text-white

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/30

              sm:h-9
              sm:w-9
            "
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* ================================================== */}
        {/* BODY                                               */}
        {/* ================================================== */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col
            overflow-hidden

            md:flex-row
          "
        >
          {/* ================================================== */}
          {/* TABLES                                             */}
          {/* ================================================== */}

          <div
            className="
              min-w-0
              shrink-0

              border-b
              border-slate-700
              bg-slate-900

              md:w-72
              md:border-b-0
              md:border-r
            "
          >
            {/* Tables Header */}

            <div
              className="
                border-b
                border-slate-700

                px-3.5
                py-2.5

                sm:px-5
                sm:py-4
              "
            >
              <div className="flex items-center justify-between gap-2">
                <h3
                  className="
                    text-xs
                    font-semibold
                    text-white

                    sm:text-sm
                  "
                >
                  Tables
                </h3>

                <span
                  className="
                    rounded-full
                    bg-slate-800
                    px-2
                    py-0.5

                    text-[9px]
                    font-medium
                    text-slate-400

                    sm:text-xs
                  "
                >
                  {tables.length}
                </span>
              </div>

              <p
                className="
                  mt-0.5
                  hidden
                  text-xs
                  text-slate-500

                  sm:block
                "
              >
                Available tables
              </p>
            </div>

            {/* Tables List */}

            <div
              className="
                flex
                max-h-[112px]
                min-w-0
                gap-2
                overflow-x-auto
                overflow-y-hidden
                p-2.5

                sm:max-h-[140px]
                sm:p-3

                md:block
                md:max-h-none
                md:space-y-2
                md:overflow-y-auto
              "
            >
              {tables.length === 0 ? (
                <p
                  className="
                    px-1
                    py-2
                    text-xs
                    text-slate-500

                    sm:text-sm
                  "
                >
                  No tables found.
                </p>
              ) : (
                tables.map((table) => (
                  <button
                    key={table}
                    type="button"
                    onClick={() =>
                      onSelectTable(
                        `SELECT * FROM ${table} LIMIT 100;`
                      )
                    }
                    className="
                      flex
                      min-w-[150px]
                      shrink-0
                      items-center
                      gap-2.5

                      rounded-lg
                      border
                      border-slate-700
                      bg-slate-800/40

                      px-3
                      py-2.5

                      text-left

                      transition-colors

                      hover:border-cyan-500/40
                      hover:bg-slate-800

                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-500/20

                      md:min-w-0
                      md:w-full
                    "
                  >
                    <Table2
                      className="
                        h-4
                        w-4
                        shrink-0
                        text-cyan-400
                      "
                    />

                    <span
                      className="
                        min-w-0
                        truncate
                        text-xs
                        font-medium
                        text-white

                        sm:text-sm
                      "
                      title={table}
                    >
                      {table}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ================================================== */}
          {/* COLUMNS / SCHEMA                                   */}
          {/* ================================================== */}

          <div
            className="
              flex
              min-h-0
              min-w-0
              flex-1
              flex-col
              overflow-hidden
              bg-slate-900
            "
          >
            {/* Schema Header */}

            <div
              className="
                shrink-0
                border-b
                border-slate-700

                px-3.5
                py-2.5

                sm:px-6
                sm:py-4
              "
            >
              <h3
                className="
                  text-xs
                  font-semibold
                  text-white

                  sm:text-sm
                "
              >
                Table Schema
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-slate-500

                  sm:text-xs
                "
              >
                Columns grouped by table
              </p>
            </div>

            {/* Schema Content */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                overflow-x-hidden

                p-3

                sm:space-y-6
                sm:p-6
              "
            >
              {Object.keys(columns).length === 0 ? (
                <div
                  className="
                    flex
                    min-h-[220px]
                    items-center
                    justify-center
                    px-4
                    text-center
                  "
                >
                  <p className="text-xs text-slate-500 sm:text-sm">
                    No schema available.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-6">
                  {Object.entries(columns).map(
                    ([tableName, tableColumns]) => (
                      <div
                        key={tableName}
                        className="
                          min-w-0
                          overflow-hidden

                          rounded-xl
                          border
                          border-slate-700
                          bg-slate-800/30

                          sm:rounded-2xl
                        "
                      >
                        {/* Table Name */}

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-2

                            border-b
                            border-slate-700

                            px-3
                            py-2.5

                            sm:px-5
                            sm:py-4
                          "
                        >
                          <Database
                            className="
                              h-3.5
                              w-3.5
                              shrink-0
                              text-cyan-400

                              sm:h-4
                              sm:w-4
                            "
                          />

                          <h4
                            className="
                              min-w-0
                              truncate
                              text-xs
                              font-semibold
                              text-white

                              sm:text-sm
                            "
                            title={tableName}
                          >
                            {tableName}
                          </h4>
                        </div>

                        {/* Columns */}

                        <div
                          className="
                            grid
                            min-w-0
                            grid-cols-1
                            gap-2
                            p-3

                            sm:grid-cols-2
                            sm:gap-3
                            sm:p-5

                            xl:grid-cols-3
                          "
                        >
                          {tableColumns.map((column) => (
                            <div
                              key={column}
                              className="
                                flex
                                min-w-0
                                items-center
                                gap-2

                                rounded-lg
                                border
                                border-slate-700
                                bg-slate-900/60

                                px-3
                                py-2.5

                                sm:gap-3
                                sm:rounded-xl
                                sm:px-4
                                sm:py-3
                              "
                            >
                              <Columns3
                                className="
                                  h-3.5
                                  w-3.5
                                  shrink-0
                                  text-emerald-400

                                  sm:h-4
                                  sm:w-4
                                "
                              />

                              <span
                                className="
                                  min-w-0
                                  truncate
                                  text-[11px]
                                  text-slate-300

                                  sm:text-sm
                                "
                                title={column}
                              >
                                {column}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* FOOTER                                             */}
        {/* ================================================== */}

        <div
          className="
            flex
            shrink-0
            justify-end

            border-t
            border-slate-700

            px-3
            py-2.5

            sm:px-6
            sm:py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border
              border-slate-700
              bg-slate-800

              px-4
              py-2

              text-xs
              font-medium
              text-slate-300

              transition-colors

              hover:bg-slate-700
              hover:text-white

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/20

              sm:rounded-xl
              sm:px-5
              sm:py-2.5
              sm:text-sm
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableExplorerDialog;