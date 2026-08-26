import databaseIcon from "../../assets/datasets/dataset.svg";
import csvIcon from "../../assets/datasets/csv.svg";
import apiIcon from "../../assets/datasets/api.svg";

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
        grid
        w-full
        grid-cols-[minmax(300px,2fr)_140px_110px_110px_48px]
        items-center

        border-b
        border-slate-800/70

        px-5
        py-4

        text-left

        transition-all
        duration-200

        hover:bg-slate-800/30

        last:border-b-0
      "
    >
      {/* ================================================== */}
      {/* DATASET                                            */}
      {/* ================================================== */}

      <div className="flex min-w-0 items-center gap-3">
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

      {/* ================================================== */}
      {/* TYPE                                               */}
      {/* ================================================== */}

      <div>
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

      {/* ================================================== */}
      {/* ROWS                                               */}
      {/* ================================================== */}

      <div className="text-[14px] font-medium text-slate-300">
        {formatNumber(rowCount)}
      </div>

      {/* ================================================== */}
      {/* COLUMNS                                            */}
      {/* ================================================== */}

      <div className="text-[14px] font-medium text-slate-300">
        {formatNumber(columnCount)}
      </div>

      {/* ================================================== */}
      {/* ARROW                                              */}
      {/* ================================================== */}

      <div className="flex justify-end">
        <span
          className="
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
    </button>
  );
}