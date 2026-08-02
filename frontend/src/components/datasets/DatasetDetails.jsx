import { useEffect, useState } from "react";
import {
  getDatasetPreview,
  getDatasetSchema,
  getDatasetStats,
  exportDataset,
} from "../../api/datasetApi";

import datasetIcon from "../../assets/datasets/dataset.svg";

export default function DatasetDetails({
  tableName,
  onBack,
}) {
  const [preview, setPreview] = useState([]);
  const [schema, setSchema] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!tableName) return;

    let active = true;

    const loadDataset = async () => {
      setLoading(true);

      try {
        const [previewData, schemaData, statsData] =
          await Promise.all([
            getDatasetPreview(tableName),
            getDatasetSchema(tableName),
            getDatasetStats(tableName),
          ]);

        if (!active) return;

        setPreview(previewData || []);
        setSchema(schemaData || []);
        setStats(statsData || null);
      } catch (error) {
        console.error("Failed to load dataset details:", error);
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

  if (!tableName) return null;

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-slate-400
          transition-colors
          hover:text-white
        "
      >
        <span className="text-base">←</span>
        Back to Datasets
      </button>

      {/* Dataset Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-700
              bg-slate-800/60
            "
          >
            <img
              src={datasetIcon}
              alt=""
              className="h-6 w-6 object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-white">
              {tableName}
            </h1>

            <p className="mt-0.5 text-sm text-slate-500">
              PostgreSQL dataset
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => exportDataset(tableName)}
          className="
            inline-flex
            items-center
            justify-center
            rounded-lg
            border
            border-slate-700
            bg-slate-800/50
            px-4
            py-2
            text-sm
            font-medium
            text-slate-300
            transition
            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white
          "
        >
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="Rows"
          value={
            loading
              ? "—"
              : stats?.row_count?.toLocaleString() ?? "—"
          }
        />

        <StatCard
          label="Columns"
          value={
            loading
              ? "—"
              : stats?.column_count?.toLocaleString() ?? "—"
          }
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800">
        <div className="flex items-center gap-7">
          {["overview", "schema", "preview"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`
                relative
                pb-3
                text-sm
                font-medium
                capitalize
                transition-colors
                ${
                  activeTab === tab
                    ? "text-blue-400"
                    : "text-slate-500 hover:text-slate-300"
                }
              `}
            >
              {tab}

              {activeTab === tab && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-px
                    bg-blue-400
                  "
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <Overview
          tableName={tableName}
          stats={stats}
          schema={schema}
          preview={preview}
          loading={loading}
        />
      )}

      {activeTab === "schema" && (
        <SchemaTable
          schema={schema}
          loading={loading}
        />
      )}

      {activeTab === "preview" && (
        <PreviewTable
          preview={preview}
          loading={loading}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats Card                                                                 */
/* -------------------------------------------------------------------------- */

function StatCard({ label, value }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-800
        bg-slate-900/50
        px-5
        py-4
      "
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

function Overview({
  tableName,
  stats,
  schema,
  preview,
  loading,
}) {
  return (
    <div className="space-y-6">
      {/* Dataset information */}
      <section>
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-slate-200">
            Dataset Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Basic information about this dataset.
          </p>
        </div>

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-800
            bg-slate-900/40
          "
        >
          <InfoRow
            label="Dataset"
            value={tableName}
          />

          <InfoRow
            label="Type"
            value="PostgreSQL Table"
          />

          <InfoRow
            label="Rows"
            value={
              loading
                ? "—"
                : stats?.row_count?.toLocaleString() ?? "—"
            }
          />

          <InfoRow
            label="Columns"
            value={
              loading
                ? "—"
                : stats?.column_count?.toLocaleString() ?? "—"
            }
          />
        </div>
      </section>

      {/* Schema preview */}
      <section>
        <SectionTitle
          title="Schema"
          description="Columns available in this dataset."
        />

        <SchemaTable
          schema={schema}
          loading={loading}
          compact
        />
      </section>

      {/* Data preview */}
      <section>
        <SectionTitle
          title="Data Preview"
          description={`Showing ${Math.min(
            preview.length,
            5
          )} rows`}
        />

        <PreviewTable
          preview={preview}
          loading={loading}
        />
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Schema                                                                     */
/* -------------------------------------------------------------------------- */

function SchemaTable({
  schema,
  loading,
  compact = false,
}) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-xl
        border
        border-slate-800
        bg-slate-900/40
        ${compact ? "max-h-[320px] overflow-y-auto" : ""}
      `}
    >
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-800 bg-slate-900/70">
          <tr>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
              Column
            </th>

            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
              Data Type
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="2"
                className="px-5 py-8 text-center text-sm text-slate-500"
              >
                Loading schema...
              </td>
            </tr>
          ) : schema.length === 0 ? (
            <tr>
              <td
                colSpan="2"
                className="px-5 py-8 text-center text-sm text-slate-500"
              >
                No schema information available.
              </td>
            </tr>
          ) : (
            schema.map((column, index) => (
              <tr
                key={`${column.column_name}-${index}`}
                className="border-b border-slate-800/70 last:border-b-0 hover:bg-slate-800/20"
              >
                <td className="px-5 py-3 font-medium text-slate-300">
                  {column.column_name}
                </td>

                <td className="px-5 py-3 font-mono text-xs text-slate-500">
                  {column.data_type}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview                                                                    */
/* -------------------------------------------------------------------------- */

function PreviewTable({
  preview,
  loading,
}) {
  const columns =
    preview.length > 0
      ? Object.keys(preview[0])
      : [];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900/70">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="
                    whitespace-nowrap
                    px-5
                    py-3
                    text-xs
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  Loading preview...
                </td>
              </tr>
            ) : preview.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  No preview data available.
                </td>
              </tr>
            ) : (
              preview.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="
                    border-b
                    border-slate-800/70
                    last:border-b-0
                    hover:bg-slate-800/20
                  "
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="
                        max-w-[280px]
                        whitespace-nowrap
                        px-5
                        py-3
                        text-slate-300
                      "
                    >
                      {formatValue(row[column])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && preview.length > 0 && (
        <div className="border-t border-slate-800 px-5 py-3">
          <p className="text-xs text-slate-500">
            Previewing {preview.length} rows
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function SectionTitle({
  title,
  description,
}) {
  return (
    <div className="mb-3">
      <h2 className="text-sm font-semibold text-slate-200">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/70 px-5 py-3 last:border-b-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-300">
        {value}
      </span>
    </div>
  );
}

function formatValue(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}