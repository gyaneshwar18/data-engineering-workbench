import {
  Search,
  Database,
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

  // Dataset navigation
  activeTab = "all",
  onTabChange = () => {},
}) {
  return (
    <div className="space-y-5">

      {/* ========================================================= */}
      {/* SEARCH + FILTERS                                          */}
      {/* ========================================================= */}

      {activeTab === "all" && (
        <div
          className="
            flex
            flex-col
            gap-3

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-6
          "
        >

          {/* Search */}

          <div
            className="
              relative
              w-full
              lg:max-w-[390px]
            "
          >
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
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
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

                text-sm
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

          <div
            className="
              flex
              w-full
              gap-2.5

              overflow-x-auto
              pb-1

              lg:w-auto
              lg:overflow-visible
              lg:pb-0

              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-slate-700
            "
          >

            {/* Type */}

            <FilterSelect
              icon={
                <Database className="h-4 w-4" />
              }
              value={type}
              onChange={onTypeChange}
              options={[
                ["all", "All Types"],
                ["table", "Table"],
                ["csv", "CSV"],
                ["api", "API"],
              ]}
            />

            {/* Source */}

            <FilterSelect
              icon={
                <Globe className="h-4 w-4" />
              }
              value={source}
              onChange={onSourceChange}
              options={[
                ["all", "All Sources"],
                ["database", "Database"],
                ["csv", "CSV"],
                ["api", "API"],
              ]}
            />

            {/* Sort */}

            <FilterSelect
              icon={
                <ArrowUpDown className="h-4 w-4" />
              }
              value={sort}
              onChange={onSortChange}
              minWidth="min-w-[190px]"
              options={[
                [
                  "recent",
                  "Sort: Recently Updated",
                ],
                ["name", "Sort: Name"],
                ["rows", "Sort: Rows"],
                ["columns", "Sort: Columns"],
              ]}
            />

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DATASET NAVIGATION                                        */}
      {/* ========================================================= */}

      <div
        className="
          -mx-1
          overflow-x-auto
          px-1

          scrollbar-none
        "
      >
        <div
          className="
            flex
            min-w-max
            items-center

            gap-5
            sm:gap-6

            border-b
            border-slate-800/80
          "
        >

          <DatasetTab
            active={activeTab === "all"}
            onClick={() =>
              onTabChange("all")
            }
          >
            All Datasets
          </DatasetTab>

          <DatasetTab
            active={activeTab === "my"}
            onClick={() =>
              onTabChange("my")
            }
          >
            My Datasets
          </DatasetTab>

          <DatasetTab
            active={activeTab === "recent"}
            onClick={() =>
              onTabChange("recent")
            }
          >
            Recently Added
          </DatasetTab>

          <DatasetTab
            active={
              activeTab === "favorites"
            }
            onClick={() =>
              onTabChange("favorites")
            }
          >
            Favorites
          </DatasetTab>

        </div>
      </div>
    </div>
  );
}

/* =============================================================== */
/* FILTER SELECT                                                   */
/* =============================================================== */

function FilterSelect({
  icon,
  value,
  onChange,
  options,
  minWidth = "min-w-[145px]",
}) {
  return (
    <div className="relative shrink-0">

      {/* Icon */}

      <div
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          z-10

          -translate-y-1/2

          text-slate-500
        "
      >
        {icon}
      </div>

      {/* Select */}

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={`
          h-11
          ${minWidth}

          appearance-none

          rounded-xl

          border
          border-slate-700/80

          bg-slate-900/80

          pl-9
          pr-9

          text-sm
          font-medium
          text-slate-300

          outline-none

          transition-all
          duration-200

          hover:border-slate-600
          hover:bg-slate-900

          focus:border-slate-600
          focus:ring-2
          focus:ring-slate-500/10

          cursor-pointer
        `}
      >
        {options.map(
          ([optionValue, label]) => (
            <option
              key={optionValue}
              value={optionValue}
            >
              {label}
            </option>
          )
        )}
      </select>

      {/* Chevron */}

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
  );
}

/* =============================================================== */
/* DATASET TAB                                                      */
/* =============================================================== */

function DatasetTab({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative

        shrink-0
        whitespace-nowrap

        pb-3.5

        text-sm
        font-medium

        transition-colors
        duration-200

        focus:outline-none

        ${
          active
            ? "font-semibold text-blue-400"
            : "text-slate-400 hover:text-slate-200"
        }
      `}
    >
      {children}

      {/* Active underline */}

      {active && (
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
      )}
    </button>
  );
}