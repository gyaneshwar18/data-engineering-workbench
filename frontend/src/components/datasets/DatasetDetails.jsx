import { useEffect, useMemo, useState } from "react";

import {
  getDatasetPreview,
  getDatasetSchema,
  getDatasetStats,
  exportDataset,
} from "../../api/datasetApi";

import databaseIcon from "../../assets/datasets/dataset.svg";
import csvIcon from "../../assets/datasets/csv.svg";
import apiIcon from "../../assets/datasets/api.svg";

export default function DatasetDetails({
  tableName,
  onBack,
}) {
  const [preview, setPreview] = useState([]);
  const [schema, setSchema] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!tableName) return;

    let active = true;

    const loadDataset = async () => {
      setLoading(true);
      setError(null);

      try {
        const [previewData, schemaData, statsData] =
          await Promise.all([
            getDatasetPreview(tableName),
            getDatasetSchema(tableName),
            getDatasetStats(tableName),
          ]);

        if (!active) return;

        setPreview(
          Array.isArray(previewData)
            ? previewData
            : []
        );

        setSchema(
          Array.isArray(schemaData)
            ? schemaData
            : []
        );

        setStats(statsData || null);
      } catch (err) {
        console.error(
          "Failed to load dataset details:",
          err
        );

        if (active) {
          setError(
            err?.response?.data?.detail ||
              "Failed to load dataset details."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDataset();

    return () => {
      active = false;
    };
  }, [tableName]);

  if (!tableName) {
    return null;
  }

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "schema",
      label: "Schema",
    },
    {
      id: "preview",
      label: "Data Preview",
    },
  ];

  /*
   * Current backend returns database tables.
   * Keep this mapping ready for future CSV/API datasets
   * without changing the current architecture.
   */
  const datasetType = "table";
  const datasetSource = "database";

  const datasetIcon =
    datasetSource === "csv"
      ? csvIcon
      : datasetSource === "api"
        ? apiIcon
        : databaseIcon;

  const typeLabel =
    datasetType === "csv"
      ? "CSV"
      : datasetType === "api"
        ? "API"
        : "Table";

  const sourceLabel =
    datasetSource === "csv"
      ? "CSV dataset"
      : datasetSource === "api"
        ? "API dataset"
        : "PostgreSQL dataset";

  const columns = useMemo(() => {
    if (!preview.length) {
      return [];
    }

    return Object.keys(preview[0] || {});
  }, [preview]);

  const formatNumber = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "—";
    }

    return Number(value).toLocaleString();
  };

  const renderCell = (value) => {
    if (value === null || value === undefined) {
      return (
        <span className="text-slate-600">
          NULL
        </span>
      );
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  const handleExport = () => {
    try {
      exportDataset(tableName);
    } catch (err) {
      console.error(
        "Failed to export dataset:",
        err
      );
    }
  };

  return (
    <div className="space-y-7">

      {/* ============================================================ */}
      {/* BACK                                                          */}
      {/* ============================================================ */}

      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex
          items-center
          gap-2

          text-sm
          font-medium
          text-slate-400

          transition-colors
          duration-200

          hover:text-white
        "
      >
        <span className="text-lg leading-none">
          ←
        </span>

        Back to Datasets
      </button>

      {/* ============================================================ */}
      {/* HEADER                                                        */}
      {/* ============================================================ */}

      <div
        className="
          flex
          flex-col
          gap-5

          rounded-2xl

          border
          border-slate-800/80

          bg-slate-950/40

          px-6
          py-6

          shadow-xl
          shadow-black/10

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex min-w-0 items-center gap-4">

          {/* Icon */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center

              rounded-xl

              border
              border-slate-700/80

              bg-slate-800/70
            "
          >
            <img
              src={datasetIcon}
              alt=""
              className="h-6 w-6 object-contain"
            />
          </div>

          {/* Name */}

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h1
                className="
                  truncate

                  text-xl
                  font-semibold
                  tracking-tight

                  text-white
                "
              >
                {tableName}
              </h1>

              <span
                className="
                  inline-flex
                  items-center

                  rounded-lg

                  border
                  border-slate-700/80

                  bg-slate-800/50

                  px-2.5
                  py-1

                  text-xs
                  font-medium

                  text-slate-300
                "
              >
                {typeLabel}
              </span>

            </div>

            <p
              className="
                mt-1

                text-sm

                text-slate-500
              "
            >
              {sourceLabel}
            </p>

          </div>
        </div>

        {/* Export */}

        <button
          type="button"
          onClick={handleExport}
          className="
            inline-flex
            shrink-0
            items-center
            justify-center
            gap-2

            rounded-lg

            border
            border-slate-700/80

            bg-slate-800/50

            px-4
            py-2.5

            text-sm
            font-medium

            text-slate-300

            transition-all
            duration-200

            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white
          "
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>

          Export CSV
        </button>
      </div>

      {/* ============================================================ */}
      {/* ERROR                                                         */}
      {/* ============================================================ */}

      {error && (
        <div
          className="
            rounded-xl

            border
            border-red-500/20

            bg-red-500/5

            px-5
            py-4
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-red-400
            "
          >
            Unable to load dataset
          </p>

          <p
            className="
              mt-1
              text-sm
              text-red-400/70
            "
          >
            {error}
          </p>
        </div>
      )}

      {/* ============================================================ */}
      {/* TABS                                                          */}
      {/* ============================================================ */}

      <div
        className="
          flex
          items-center
          gap-7

          border-b
          border-slate-800
        "
      >
        {tabs.map((tab) => {
          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`
                relative

                pb-3

                text-sm
                font-medium

                transition-colors
                duration-200

                ${
                  active
                    ? "text-blue-400"
                    : "text-slate-400 hover:text-slate-200"
                }
              `}
            >
              {tab.label}

              {active && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0

                    h-0.5

                    rounded-full

                    bg-blue-500
                  "
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* LOADING                                                       */}
      {/* ============================================================ */}

      {loading ? (
        <DatasetDetailsSkeleton />
      ) : (
        <>
          {/* ======================================================== */}
          {/* OVERVIEW                                                  */}
          {/* ======================================================== */}

          {activeTab === "overview" && (
            <div className="space-y-5">

              {/* Stats */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4

                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                <StatCard
                  label="Rows"
                  value={formatNumber(
                    stats?.row_count
                  )}
                />

                <StatCard
                  label="Columns"
                  value={formatNumber(
                    stats?.column_count
                  )}
                />

                <StatCard
                  label="Source"
                  value="PostgreSQL"
                />

              </div>

              {/* Dataset information */}

              <div
                className="
                  rounded-2xl

                  border
                  border-slate-800/80

                  bg-slate-950/40

                  shadow-xl
                  shadow-black/10
                "
              >

                <div
                  className="
                    border-b
                    border-slate-800/80

                    px-5
                    py-4
                  "
                >
                  <h2
                    className="
                      text-[15px]
                      font-semibold
                      text-slate-200
                    "
                  >
                    Dataset Information
                  </h2>
                </div>

                <div
                  className="
                    grid
                    grid-cols-1

                    divide-y
                    divide-slate-800/70

                    sm:grid-cols-2
                    sm:divide-x
                    sm:divide-y-0
                  "
                >

                  <InfoItem
                    label="Dataset"
                    value={tableName}
                  />

                  <InfoItem
                    label="Source"
                    value={sourceLabel}
                  />

                </div>

              </div>

              {/* Quick preview */}

              <div
                className="
                  rounded-2xl

                  border
                  border-slate-800/80

                  bg-slate-950/40

                  shadow-xl
                  shadow-black/10
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    border-b
                    border-slate-800/80

                    px-5
                    py-4
                  "
                >
                  <div>
                    <h2
                      className="
                        text-[15px]
                        font-semibold
                        text-slate-200
                      "
                    >
                      Data Preview
                    </h2>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        text-slate-500
                      "
                    >
                      First 10 rows
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab("preview")
                    }
                    className="
                      text-xs
                      font-medium
                      text-blue-400

                      transition-colors

                      hover:text-blue-300
                    "
                  >
                    View all
                  </button>
                </div>

                <PreviewTable
                  preview={preview}
                  columns={columns}
                />

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* SCHEMA                                                    */}
          {/* ======================================================== */}

          {activeTab === "schema" && (
            <SchemaSection
              schema={schema}
            />
          )}

          {/* ======================================================== */}
          {/* DATA PREVIEW                                              */}
          {/* ======================================================== */}

          {activeTab === "preview" && (
            <PreviewSection
              preview={preview}
              columns={columns}
            />
          )}

        </>
      )}
    </div>
  );
}


/* ================================================================== */
/* STAT CARD                                                         */
/* ================================================================== */

function StatCard({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-xl

        border
        border-slate-800/80

        bg-slate-950/40

        px-5
        py-5

        shadow-lg
        shadow-black/5
      "
    >
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2

          text-xl
          font-semibold

          text-slate-200
        "
      >
        {value}
      </p>
    </div>
  );
}


/* ================================================================== */
/* INFO ITEM                                                         */
/* ================================================================== */

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="px-5 py-4">

      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5

          truncate

          text-sm
          font-medium

          text-slate-300
        "
      >
        {value}
      </p>

    </div>
  );
}


/* ================================================================== */
/* SCHEMA                                                            */
/* ================================================================== */

function SchemaSection({
  schema = [],
}) {
  return (
    <div
      className="
        overflow-hidden

        rounded-2xl

        border
        border-slate-800/80

        bg-slate-950/40

        shadow-xl
        shadow-black/10
      "
    >

      <div
        className="
          border-b
          border-slate-800/80

          px-5
          py-4
        "
      >
        <h2
          className="
            text-[15px]
            font-semibold
            text-slate-200
          "
        >
          Schema
        </h2>

        <p
          className="
            mt-0.5
            text-xs
            text-slate-500
          "
        >
          {schema.length} columns
        </p>
      </div>

      {schema.length > 0 ? (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[520px]">

            <thead>
              <tr
                className="
                  border-b
                  border-slate-800/80

                  bg-slate-900/20

                  text-left

                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]

                  text-slate-500
                "
              >
                <th className="px-5 py-3.5">
                  Column
                </th>

                <th className="px-5 py-3.5">
                  Data Type
                </th>
              </tr>
            </thead>

            <tbody>
              {schema.map(
                (column, index) => (
                  <tr
                    key={`${column.column_name}-${index}`}
                    className="
                      border-b
                      border-slate-800/70

                      last:border-b-0

                      hover:bg-slate-800/20
                    "
                  >

                    <td
                      className="
                        px-5
                        py-4

                        text-sm
                        font-medium

                        text-slate-300
                      "
                    >
                      {column.column_name}
                    </td>

                    <td
                      className="
                        px-5
                        py-4

                        text-sm

                        text-slate-500
                      "
                    >
                      {column.data_type}
                    </td>

                  </tr>
                )
              )}
            </tbody>

          </table>

        </div>
      ) : (
        <EmptySection
          title="No schema information"
          description="No column information is available for this dataset."
        />
      )}

    </div>
  );
}


/* ================================================================== */
/* PREVIEW SECTION                                                    */
/* ================================================================== */

function PreviewSection({
  preview = [],
  columns = [],
}) {
  return (
    <div
      className="
        overflow-hidden

        rounded-2xl

        border
        border-slate-800/80

        bg-slate-950/40

        shadow-xl
        shadow-black/10
      "
    >

      <div
        className="
          border-b
          border-slate-800/80

          px-5
          py-4
        "
      >
        <h2
          className="
            text-[15px]
            font-semibold
            text-slate-200
          "
        >
          Data Preview
        </h2>

        <p
          className="
            mt-0.5
            text-xs
            text-slate-500
          "
        >
          Showing up to 10 rows
        </p>
      </div>

      <PreviewTable
        preview={preview}
        columns={columns}
      />

    </div>
  );
}


/* ================================================================== */
/* PREVIEW TABLE                                                      */
/* ================================================================== */

function PreviewTable({
  preview = [],
  columns = [],
}) {
  if (
    !preview.length ||
    !columns.length
  ) {
    return (
      <EmptySection
        title="No data available"
        description="This dataset does not contain any rows to preview."
      />
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[700px]">

        <thead>
          <tr
            className="
              border-b
              border-slate-800/80

              bg-slate-900/20

              text-left

              text-[11px]
              font-semibold
              uppercase
              tracking-[0.08em]

              text-slate-500
            "
          >
            {columns.map(
              (column) => (
                <th
                  key={column}
                  className="
                    whitespace-nowrap

                    px-5
                    py-3.5
                  "
                >
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {preview.map(
            (row, rowIndex) => (
              <tr
                key={rowIndex}
                className="
                  border-b
                  border-slate-800/70

                  last:border-b-0

                  hover:bg-slate-800/20
                "
              >
                {columns.map(
                  (column) => (
                    <td
                      key={column}
                      className="
                        max-w-[280px]

                        truncate

                        whitespace-nowrap

                        px-5
                        py-3.5

                        text-sm

                        text-slate-300
                      "
                    >
                      {row[column] === null ||
                      row[column] === undefined ? (
                        <span className="text-slate-600">
                          NULL
                        </span>
                      ) : typeof row[column] ===
                        "object" ? (
                        JSON.stringify(
                          row[column]
                        )
                      ) : (
                        String(row[column])
                      )}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>

      </table>

    </div>
  );
}


/* ================================================================== */
/* EMPTY SECTION                                                       */
/* ================================================================== */

function EmptySection({
  title,
  description,
}) {
  return (
    <div
      className="
        flex
        min-h-[220px]

        items-center
        justify-center

        px-6
      "
    >
      <div
        className="
          max-w-sm

          text-center
        "
      >

        <div
          className="
            mx-auto
            mb-4

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-xl

            border
            border-slate-700/80

            bg-slate-800/50
          "
        >
          <svg
            className="
              h-5
              w-5
              text-slate-500
            "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h10" />
          </svg>
        </div>

        <p
          className="
            text-[15px]
            font-semibold
            text-slate-300
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1.5

            text-sm
            leading-6

            text-slate-500
          "
        >
          {description}
        </p>

      </div>
    </div>
  );
}


/* ================================================================== */
/* LOADING SKELETON                                                   */
/* ================================================================== */

function DatasetDetailsSkeleton() {
  return (
    <div className="space-y-5">

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          gap-4

          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {[1, 2, 3].map(
          (item) => (
            <div
              key={item}
              className="
                rounded-xl

                border
                border-slate-800/80

                bg-slate-950/40

                px-5
                py-5
              "
            >
              <div
                className="
                  h-3
                  w-16

                  animate-pulse

                  rounded

                  bg-slate-800
                "
              />

              <div
                className="
                  mt-3

                  h-6
                  w-20

                  animate-pulse

                  rounded

                  bg-slate-800
                "
              />
            </div>
          )
        )}
      </div>

      {/* Main content */}

      <div
        className="
          overflow-hidden

          rounded-2xl

          border
          border-slate-800/80

          bg-slate-950/40
        "
      >

        <div
          className="
            border-b
            border-slate-800/80

            px-5
            py-4
          "
        >
          <div
            className="
              h-4
              w-32

              animate-pulse

              rounded

              bg-slate-800
            "
          />
        </div>

        {[1, 2, 3, 4, 5].map(
          (item) => (
            <div
              key={item}
              className="
                flex

                border-b
                border-slate-800/70

                px-5
                py-4

                last:border-b-0
              "
            >
              <div
                className="
                  h-3
                  w-40

                  animate-pulse

                  rounded

                  bg-slate-800
                "
              />
            </div>
          )
        )}

      </div>

    </div>
  );
}