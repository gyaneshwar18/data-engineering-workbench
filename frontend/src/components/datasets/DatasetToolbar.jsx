import {
  Search,
  Database,
  FileSpreadsheet,
  Globe,
  ArrowUpDown,
} from "lucide-react";

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
    <div className="space-y-5">
      {/* ================================================== */}
      {/* SEARCH + FILTERS                                   */}
      {/* ================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-[390px]">
          <Search
            className="
              pointer-events-none
              absolute
              left-3.5
              top-1/2
              h-[17px]
              w-[17px]
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search datasets..."
            className="
              h-11
              w-full
              rounded-xl

              border
              border-slate-700/80

              bg-slate-900/70

              pl-10
              pr-4

              text-[14px]
              font-medium
              text-slate-200

              placeholder:text-slate-500

              outline-none

              transition-all
              duration-200

              hover:border-slate-600

              focus:border-blue-500/60
              focus:bg-slate-900
              focus:ring-2
              focus:ring-blue-500/10
            "
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Type */}
          <div className="relative">
            <Database
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                z-10
                h-4
                w-4
                -translate-y-1/2
                text-slate-500
              "
            />

            <select
              value={type}
              onChange={(e) => onTypeChange(e.target.value)}
              className="
                h-11
                min-w-[145px]
                appearance-none
                rounded-xl

                border
                border-slate-700/80

                bg-slate-900/80

                pl-9
                pr-9

                text-[14px]
                font-medium
                text-slate-300

                outline-none

                transition-all
                duration-200

                hover:border-blue-500/30
                hover:bg-slate-900

                focus:border-blue-500/60
                focus:ring-2
                focus:ring-blue-500/10

                cursor-pointer
              "
            >
              <option value="all">All Types</option>
              <option value="table">Table</option>
              <option value="csv">CSV</option>
              <option value="api">API</option>
            </select>

            {/* Custom chevron */}
            <svg
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-500
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Source */}
          <div className="relative">
            <Globe
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                z-10
                h-4
                w-4
                -translate-y-1/2
                text-slate-500
              "
            />

            <select
              value={source}
              onChange={(e) => onSourceChange(e.target.value)}
              className="
                h-11
                min-w-[155px]
                appearance-none
                rounded-xl

                border
                border-slate-700/80

                bg-slate-900/80

                pl-9
                pr-9

                text-[14px]
                font-medium
                text-slate-300

                outline-none

                transition-all
                duration-200

                hover:border-emerald-500/30
                hover:bg-slate-900

                focus:border-emerald-500/60
                focus:ring-2
                focus:ring-emerald-500/10

                cursor-pointer
              "
            >
              <option value="all">All Sources</option>
              <option value="database">Database</option>
              <option value="csv">CSV</option>
              <option value="api">API</option>
            </select>

            {/* Custom chevron */}
            <svg
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-500
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                z-10
                h-4
                w-4
                -translate-y-1/2
                text-slate-500
              "
            />

            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="
                h-11
                min-w-[190px]
                appearance-none
                rounded-xl

                border
                border-slate-700/80

                bg-slate-900/80

                pl-9
                pr-9

                text-[14px]
                font-medium
                text-slate-300

                outline-none

                transition-all
                duration-200

                hover:border-violet-500/30
                hover:bg-slate-900

                focus:border-violet-500/60
                focus:ring-2
                focus:ring-violet-500/10

                cursor-pointer
              "
            >
              <option value="recent">
                Sort: Recently Updated
              </option>

              <option value="name">
                Sort: Name
              </option>

              <option value="rows">
                Sort: Rows
              </option>

              <option value="columns">
                Sort: Columns
              </option>
            </select>

            {/* Custom chevron */}
            <svg
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-500
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* DATASET TABS                                       */}
      {/* ================================================== */}

      <div className="flex items-center gap-7 border-b border-slate-800/80">
        {/* All */}
        <button
          type="button"
          className="
            relative
            pb-3.5

            text-[14px]
            font-semibold

            text-blue-400

            transition-colors
          "
        >
          All Datasets

          <span
            className="
              absolute
              bottom-[-1px]
              left-0
              h-[2px]
              w-full

              rounded-full

              bg-blue-500
            "
          />
        </button>

        {/* My Datasets */}
        <button
          type="button"
          className="
            pb-3.5

            text-[14px]
            font-medium

            text-slate-400

            transition-colors
            duration-200

            hover:text-slate-200
          "
        >
          My Datasets
        </button>

        {/* Recently Added */}
        <button
          type="button"
          className="
            pb-3.5

            text-[14px]
            font-medium

            text-slate-400

            transition-colors
            duration-200

            hover:text-slate-200
          "
        >
          Recently Added
        </button>

        {/* Favorites */}
        <button
          type="button"
          className="
            flex
            items-center
            gap-1.5

            pb-3.5

            text-[14px]
            font-medium

            text-slate-400

            transition-colors
            duration-200

            hover:text-slate-200
          "
        >
          Favorites
        </button>
      </div>
    </div>
  );
}