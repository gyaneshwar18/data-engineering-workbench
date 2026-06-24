import {
  Layers,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";

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
        bg-slate-900/80
        border
        border-slate-800
        rounded-2xl
        p-6
        mb-8
      "
    >
      <div
        className="
          grid
          grid-cols-4
          divide-x
          divide-slate-800
        "
      >
        <Metric
          icon={
            <Layers className="h-6 w-6 text-blue-400" />
          }
          iconBg="bg-blue-500/10"
          title="Total Pipelines"
          value={pipelines.length}
        />

        <Metric
          icon={
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          }
          iconBg="bg-green-500/10"
          title="Successful"
          value={success}
        />

        <Metric
          icon={
            <XCircle className="h-6 w-6 text-red-400" />
          }
          iconBg="bg-red-500/10"
          title="Failed"
          value={failed}
        />

        <Metric
          icon={
            <Activity className="h-6 w-6 text-yellow-400" />
          }
          iconBg="bg-yellow-500/10"
          title="Running"
          value={running}
        />
      </div>
    </div>
  );
}

function Metric({
  icon,
  iconBg,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-4 px-6">

      <div
        className={`
          h-12
          w-12
          rounded-full
          flex
          items-center
          justify-center
          ${iconBg}
        `}
      >
        {icon}
      </div>

      <div>
        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <h3 className="text-3xl font-semibold text-white">
          {value}
        </h3>
      </div>

    </div>
  );
}