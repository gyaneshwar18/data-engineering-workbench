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
        mb-5
        min-w-0
        rounded-xl
        border
        border-slate-800
        bg-slate-900/80
        p-3.5

        sm:mb-6
        sm:rounded-2xl
        sm:p-4

        md:p-5

        lg:mb-8
        lg:p-6
      "
    >
      <div
        className="
          grid
          min-w-0
          grid-cols-2
          gap-y-3

          sm:gap-y-4

          lg:grid-cols-4
          lg:gap-y-0
        "
      >
        <Metric
          icon={
            <Layers className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          }
          iconBg="bg-blue-500/10"
          title="Total Pipelines"
          value={pipelines.length}
        />

        <Metric
          icon={
            <CheckCircle2 className="h-4 w-4 text-green-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          }
          iconBg="bg-green-500/10"
          title="Successful"
          value={success}
        />

        <Metric
          icon={
            <XCircle className="h-4 w-4 text-red-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          }
          iconBg="bg-red-500/10"
          title="Failed"
          value={failed}
        />

        <Metric
          icon={
            <Activity className="h-4 w-4 text-yellow-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
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
    <div
      className="
        flex
        min-w-0
        items-center
        gap-2.5
        px-2.5
        py-2.5

        sm:gap-3
        sm:px-4
        sm:py-3

        lg:gap-4
        lg:px-6
        lg:py-0
      "
    >
      <div
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          ${iconBg}

          sm:h-10
          sm:w-10

          lg:h-12
          lg:w-12
        `}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            truncate
            text-[10px]
            leading-4
            text-slate-400

            sm:text-xs

            lg:text-sm
          "
        >
          {title}
        </p>

        <h3
          className="
            mt-0.5
            text-xl
            font-semibold
            leading-6
            text-white

            sm:text-2xl
            sm:leading-7

            lg:mt-0
            lg:text-3xl
            lg:leading-9
          "
        >
          {value}
        </h3>
      </div>
    </div>
  );
}