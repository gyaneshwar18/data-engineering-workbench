import { Database, Inbox } from "lucide-react";
import DatasetRow from "./DatasetRow";

export default function DatasetList({
  datasets = [],
  onSelect,
}) {
  const count = datasets.length;

  return (
    <div
      className="
        w-full
        overflow-hidden

        rounded-2xl

        border
        border-slate-800/80

        bg-slate-950/40

        shadow-xl
        shadow-black/10
      "
    >
      {/* ================================================== */}
      {/* LIST HEADER                                        */}
      {/* ================================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-slate-800/80

          bg-slate-900/30

          px-5
          py-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-lg

              border
              border-blue-500/20

              bg-blue-500/10
            "
          >
            <Database className="h-4 w-4 text-blue-400" />
          </div>

          <div>
            <p
              className="
                text-[15px]
                font-semibold
                text-slate-200
              "
            >
              Datasets
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-500
              "
            >
              {count === 1
                ? "1 dataset available"
                : `${count} datasets available`}
            </p>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* COLUMN HEADER                                      */}
      {/* ================================================== */}

      {count > 0 && (
        <div
          className="
            grid

            grid-cols-[minmax(300px,2fr)_140px_110px_110px_48px]

            items-center

            border-b
            border-slate-800/80

            bg-slate-900/20

            px-5
            py-3.5

            text-[11px]
            font-semibold
            uppercase
            tracking-[0.08em]

            text-slate-500
          "
        >
          <span>Dataset</span>
          <span>Type</span>
          <span>Rows</span>
          <span>Columns</span>
          <span />
        </div>
      )}

      {/* ================================================== */}
      {/* ROWS                                               */}
      {/* ================================================== */}

      {count > 0 ? (
        <div>
          {datasets.map((dataset) => (
            <DatasetRow
              key={dataset.table_name}
              dataset={dataset}
              onClick={() => onSelect?.(dataset)}
            />
          ))}
        </div>
      ) : (
        /* ================================================== */
        /* EMPTY STATE                                        */
        /* ================================================== */

        <div
          className="
            flex
            min-h-[280px]
            items-center
            justify-center

            px-6
          "
        >
          <div className="flex max-w-sm flex-col items-center text-center">
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
                border-slate-700/80

                bg-slate-800/50
              "
            >
              <Inbox className="h-5 w-5 text-slate-500" />
            </div>

            <p
              className="
                text-[15px]
                font-semibold
                text-slate-300
              "
            >
              No datasets found
            </p>

            <p
              className="
                mt-1.5
                text-sm
                leading-6
                text-slate-500
              "
            >
              No datasets match your current search or filters.
              Try adjusting your filters or upload a new dataset.
            </p>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* FOOTER                                             */}
      {/* ================================================== */}

      {count > 0 && (
        <div
          className="
            flex
            items-center
            justify-between

            border-t
            border-slate-800/80

            bg-slate-900/20

            px-5
            py-3.5
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-slate-500
            "
          >
            Showing{" "}
            <span className="text-slate-300">
              {count}
            </span>{" "}
            {count === 1 ? "dataset" : "datasets"}
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled
              className="
                rounded-lg

                border
                border-slate-800

                px-3
                py-1.5

                text-xs
                font-medium

                text-slate-600

                cursor-not-allowed
              "
            >
              Previous
            </button>

            <button
              type="button"
              aria-current="page"
              className="
                rounded-lg

                border
                border-blue-500/40

                bg-blue-500/10

                px-3
                py-1.5

                text-xs
                font-semibold

                text-blue-400
              "
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="
                rounded-lg

                border
                border-slate-800

                px-3
                py-1.5

                text-xs
                font-medium

                text-slate-600

                cursor-not-allowed
              "
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}