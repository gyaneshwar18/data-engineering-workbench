import { useEffect, useState } from "react";
import { getDatasetStats } from "../../api/datasetApi";

import datasetIcon from "../../assets/datasets/dataset.svg";

export default function DatasetRow({ dataset, onClick }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const tableName = dataset?.table_name;

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      if (!tableName) return;

      try {
        const data = await getDatasetStats(tableName);

        if (active) {
          setStats(data);
        }
      } catch (error) {
        console.error(
          `Failed to load stats for ${tableName}`,
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      active = false;
    };
  }, [tableName]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        grid
        w-full
        grid-cols-[minmax(260px,2fr)_140px_100px_100px_48px]
        items-center
        border-b
        border-slate-800/70
        px-5
        py-4
        text-left
        transition-colors
        duration-200
        hover:bg-slate-800/30
        last:border-b-0
      "
    >
      {/* Dataset */}
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-slate-700
            bg-slate-800/60
            transition-colors
            group-hover:border-blue-500/30
          "
        >
          <img
            src={datasetIcon}
            alt=""
            className="h-5 w-5 object-contain"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
            {tableName}
          </p>

          <p className="mt-0.5 truncate text-xs text-slate-500">
            PostgreSQL dataset
          </p>
        </div>
      </div>

      {/* Type */}
      <div>
        <span
          className="
            inline-flex
            rounded-md
            border
            border-slate-700/80
            bg-slate-800/40
            px-2.5
            py-1
            text-xs
            text-slate-400
          "
        >
          Table
        </span>
      </div>

      {/* Rows */}
      <div className="text-sm text-slate-300">
        {loading ? (
          <span className="text-slate-600">—</span>
        ) : (
          stats?.row_count?.toLocaleString() ?? "—"
        )}
      </div>

      {/* Columns */}
      <div className="text-sm text-slate-300">
        {loading ? (
          <span className="text-slate-600">—</span>
        ) : (
          stats?.column_count?.toLocaleString() ?? "—"
        )}
      </div>

      {/* Arrow */}
      <div className="flex justify-end">
        <span
          className="
            text-lg
            text-slate-600
            transition-all
            duration-200
            group-hover:translate-x-0.5
            group-hover:text-slate-300
          "
        >
          →
        </span>
      </div>
    </button>
  );
}