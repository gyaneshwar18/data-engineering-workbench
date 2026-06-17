export default function MetricsBar({
  pipelines,
}) {
  const success =
    pipelines.filter(
      (p) => p.status === "success"
    ).length;

  const failed =
    pipelines.filter(
      (p) => p.status === "failed"
    ).length;

  const running =
    pipelines.filter(
      (p) => p.status === "running"
    ).length;

  return (
    <div
      className="
        grid
        grid-cols-4
        gap-6
        mb-8
      "
    >
      <Metric
        title="Total"
        value={pipelines.length}
      />

      <Metric
        title="Success"
        value={success}
      />

      <Metric
        title="Failed"
        value={failed}
      />

      <Metric
        title="Running"
        value={running}
      />
    </div>
  );
}

function Metric({
  title,
  value,
}) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
      "
    >
      <p className="text-slate-400">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}