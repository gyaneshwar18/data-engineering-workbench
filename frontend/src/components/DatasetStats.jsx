export default function DatasetStats({ dataset }) {
  return (
    <div className="grid grid-cols-4 gap-8">

      <StatCard label="Rows" value={dataset.rows.toLocaleString()} />
      <StatCard label="Columns" value={dataset.columns} />
      <StatCard label="Null %" value={`${dataset.nullPercent}%`} />
      <StatCard label="Last Refresh" value={dataset.lastRefresh} />

    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="
     bg-white dark:bg-gray-900
border border-gray-200 dark:border-gray-800
    ">
      <p className="text-xs uppercase text-gray-500 tracking-wide">
        {label}
      </p>
      <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}