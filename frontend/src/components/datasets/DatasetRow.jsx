import databaseIcon from "../../assets/datasets/dataset.svg";
import csvIcon from "../../assets/datasets/csv.svg";
import apiIcon from "../../assets/datasets/api.svg";
import { ChevronRight } from "lucide-react";

export default function DatasetRow({ dataset, onClick }) {
  const {
    table_name: tableName,
    type = "table",
    source = "database",
    row_count: rowCount,
    column_count: columnCount,
    updated_at: updatedAt,
  } = dataset || {};

  const getDatasetIcon = () => {
    if (source === "csv" || type === "csv") {
      return csvIcon;
    }

    if (source === "api" || type === "api") {
      return apiIcon;
    }

    return databaseIcon;
  };

  const getSourceLabel = () => {
    if (source === "csv") return "CSV dataset";
    if (source === "api") return "API dataset";

    return "PostgreSQL dataset";
  };

  const getTypeLabel = () => {
    if (type === "csv") return "CSV";
    if (type === "api") return "API";

    return "Table";
  };

  const formatNumber = (value) => {
    if (value === null || value === undefined) {
      return "—";
    }

    return Number(value).toLocaleString();
  };

  const formatUpdatedAt = (value) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleDateString();
  };

  const updatedLabel = formatUpdatedAt(updatedAt);

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        border-b
        border-slate-800/70
        text-left
        transition-colors
        duration-200
        hover:bg-slate-800/30
        last:border-b-0

        md:grid
        md:grid-cols-[minmax(300px,2fr)_140px_110px_110px_48px]
        md:items-center
        md:px-5
        md:py-4
      "
    >
      {/* ================================================== */}
      {/* MOBILE                                             */}
      {/* ================================================== */}

      <div className="px-4 py-4 md:hidden">
        <div className="flex items-start gap-3">
          {/* Icon */}

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
              border-slate-700/80
              bg-slate-800/70
              transition-colors
              duration-200
              group-hover:border-blue-500/40
              group-hover:bg-blue-500/10
            "
          >
            <img
              src={getDatasetIcon()}
              alt=""
              className="h-5 w-5 object-contain"
            />
          </div>

          {/* Dataset information */}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-[15px]
                    font-medium
                    text-slate-200
                    transition-colors
                    duration-200
                    group-hover:text-white
                  "
                >
                  {tableName || "Unnamed dataset"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {getSourceLabel()}
                </p>
              </div>

              {/* Arrow */}

              <span
                className="
                  shrink-0
                  pt-0.5
                  text-lg
                  text-slate-600
                  transition-all
                  duration-200
                  group-hover:translate-x-1
                  group-hover:text-slate-300
                "
              >
                →
              </span>
            </div>

            {/* Mobile metrics */}

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-xs
              "
            >
              {/* Type */}

              <span
                className="
                  inline-flex
                  items-center
                  rounded-md
                  border
                  border-slate-700/80
                  bg-slate-800/50
                  px-2.5
                  py-1
                  font-medium
                  text-slate-300
                "
              >
                {getTypeLabel()}
              </span>

              {/* Rows */}

              <span className="text-slate-500">
                Rows
                <span className="ml-1 font-medium text-slate-300">
                  {formatNumber(rowCount)}
                </span>
              </span>

              <span className="text-slate-700">•</span>

              {/* Columns */}

              <span className="text-slate-500">
                Columns
                <span className="ml-1 font-medium text-slate-300">
                  {formatNumber(columnCount)}
                </span>
              </span>
            </div>

            {/* Updated */}

            {updatedLabel && (
              <p className="mt-2 text-[11px] text-slate-600">
                Updated {updatedLabel}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* DESKTOP                                             */}
      {/* ================================================== */}

      <div
        className="
          hidden
          min-w-0
          items-center
          gap-3
          md:flex
        "
      >
        {/* Icon */}

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
            border-slate-700/80
            bg-slate-800/70
            transition-all
            duration-200
            group-hover:border-blue-500/40
            group-hover:bg-blue-500/10
          "
        >
          <img
            src={getDatasetIcon()}
            alt=""
            className="h-5 w-5 object-contain"
          />
        </div>

        {/* Name + metadata */}

        <div className="min-w-0">
          <p
            className="
              truncate
              text-[15px]
              font-medium
              text-slate-200
              transition-colors
              duration-200
              group-hover:text-white
            "
          >
            {tableName || "Unnamed dataset"}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {getSourceLabel()}
            </span>

            {updatedLabel && (
              <>
                <span className="text-slate-700">•</span>

                <span className="text-xs text-slate-500">
                  Updated {updatedLabel}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Type */}

      <div className="hidden md:block">
        <span
          className="
            inline-flex
            items-center
            rounded-lg
            border
            border-slate-700/80
            bg-slate-800/50
            px-3
            py-1.5
            text-xs
            font-medium
            text-slate-300
          "
        >
          {getTypeLabel()}
        </span>
      </div>

      {/* Desktop Rows */}

      <div
        className="
          hidden
          text-[14px]
          font-medium
          text-slate-300
          md:block
        "
      >
        {formatNumber(rowCount)}
      </div>

      {/* Desktop Columns */}

      <div
        className="
          hidden
          text-[14px]
          font-medium
          text-slate-300
          md:block
        "
      >
        {formatNumber(columnCount)}
      </div>

      {/* Desktop Arrow */}

      <div className="hidden justify-end md:flex">
        <ChevronRight
          className="
    h-5
    w-5
    shrink-0
    text-slate-600

    transition-all
    duration-200

    group-hover:translate-x-0.5
    group-hover:text-slate-300
  "
          strokeWidth={1.8}
        />
      </div>
    </button>
  );
}