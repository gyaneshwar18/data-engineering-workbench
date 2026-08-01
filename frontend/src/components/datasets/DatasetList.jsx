import DatasetRow from "./DatasetRow";

export default function DatasetList({
  datasets = [],
  onSelect,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40">
      {/* Header */}
      <div className="border-b border-slate-800/80 px-5 py-4">
        <p className="text-sm font-semibold text-slate-200">
          {datasets.length} Datasets
        </p>
      </div>

      {/* Column Header */}
      <div
        className="
          grid
          grid-cols-[minmax(260px,2fr)_140px_100px_100px_48px]
          items-center
          border-b
          border-slate-800/80
          px-5
          py-3
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        <span>Dataset</span>
        <span>Source</span>
        <span>Rows</span>
        <span>Columns</span>
        <span />
      </div>

      {/* Rows */}
      {datasets.length > 0 ? (
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
        <div className="flex min-h-[220px] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-300">
              No datasets found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      {datasets.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-800/80 px-5 py-3">
          <p className="text-xs text-slate-500">
            Showing {datasets.length} datasets
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="
                rounded-md
                border border-slate-800
                px-3 py-1.5
                text-xs
                text-slate-600
                cursor-not-allowed
              "
            >
              Previous
            </button>

            <button
              type="button"
              className="
                rounded-md
                border border-blue-500/40
                bg-blue-500/10
                px-3 py-1.5
                text-xs
                font-medium
                text-blue-400
              "
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="
                rounded-md
                border border-slate-800
                px-3 py-1.5
                text-xs
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