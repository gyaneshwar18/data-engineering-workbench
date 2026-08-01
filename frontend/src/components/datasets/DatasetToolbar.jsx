export default function DatasetToolbar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  source,
  onSourceChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-[365px]">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search datasets..."
            className="
              h-10
              w-full
              rounded-lg
              border border-slate-700/80
              bg-slate-900/70
              pl-10 pr-4
              text-sm
              text-slate-200
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-blue-500/60
              focus:ring-1
              focus:ring-blue-500/20
            "
          />

          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="
              h-10
              min-w-[130px]
              rounded-lg
              border border-slate-700/80
              bg-slate-900/70
              px-3
              text-sm
              text-slate-300
              outline-none
              transition
              hover:border-slate-600
              focus:border-blue-500/60
            "
          >
            <option value="all">All Types</option>
            <option value="table">Table</option>
            <option value="csv">CSV</option>
            <option value="api">API</option>
          </select>

          <select
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            className="
              h-10
              min-w-[135px]
              rounded-lg
              border border-slate-700/80
              bg-slate-900/70
              px-3
              text-sm
              text-slate-300
              outline-none
              transition
              hover:border-slate-600
              focus:border-blue-500/60
            "
          >
            <option value="all">All Sources</option>
            <option value="database">Database</option>
            <option value="csv">CSV</option>
            <option value="api">API</option>
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="
              h-10
              min-w-[170px]
              rounded-lg
              border border-slate-700/80
              bg-slate-900/70
              px-3
              text-sm
              text-slate-300
              outline-none
              transition
              hover:border-slate-600
              focus:border-blue-500/60
            "
          >
            <option value="recent">Sort: Recently Updated</option>
            <option value="name">Sort: Name</option>
            <option value="rows">Sort: Rows</option>
            <option value="columns">Sort: Columns</option>
          </select>
        </div>
      </div>

      {/* Dataset Tabs */}
      <div className="flex items-center gap-7 border-b border-slate-800">
        <button
          type="button"
          className="
            relative
            pb-3
            text-sm
            font-medium
            text-blue-400
          "
        >
          All Datasets
        </button>

        <button
          type="button"
          className="
            pb-3
            text-sm
            text-slate-400
            transition
            hover:text-slate-200
          "
        >
          My Datasets
        </button>

        <button
          type="button"
          className="
            pb-3
            text-sm
            text-slate-400
            transition
            hover:text-slate-200
          "
        >
          Recently Added
        </button>

        <button
          type="button"
          className="
            pb-3
            text-sm
            text-slate-400
            transition
            hover:text-slate-200
          "
        >
          Favorites
        </button>
      </div>
    </div>
  );
}