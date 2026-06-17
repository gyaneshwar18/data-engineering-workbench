import StatusBadge from "./ui/StatusBadge";

export default function PipelineCard({
  pipeline,
  onRun,
  onLogs,
  onHistory,
  running,
}) {
  const getIcon = () => {
    if (pipeline.name.toLowerCase().includes("api")) {
      return "🌐";
    }

    if (pipeline.name.toLowerCase().includes("csv")) {
      return "📊";
    }

    return "🗄️";
  };

  return (
    <div
      className="
        bg-slate-900/90
        border
        border-slate-800
        rounded-3xl
        p-6
        hover:border-blue-500/30
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex gap-5">

          <div
            className="
              h-18
              w-18
              rounded-2xl
              bg-slate-800
              flex
              items-center
              justify-center
              text-4xl
            "
          >
            {getIcon()}
          </div>

          <div>

            <h2 className="text-3xl font-semibold text-white">
              {pipeline.name}
            </h2>

            <p className="text-slate-400 text-xl mt-2">
              {pipeline.source} → {pipeline.destination}
            </p>

          </div>

        </div>

        <button
          className="
            text-slate-400
            hover:text-white
            text-2xl
          "
        >
          ⋮
        </button>

      </div>

      <div className="border-t border-slate-800 my-6"></div>

      {/* Status Row */}

      <div className="grid grid-cols-2 gap-10">

        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-widest
              text-slate-500
              mb-3
            "
          >
            Status
          </p>

          <StatusBadge status={pipeline.status} />

        </div>

        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-widest
              text-slate-500
              mb-3
            "
          >
            Last Run
          </p>

          <p className="text-slate-300">
            {pipeline.last_run
              ? new Date(
                  pipeline.last_run
                ).toLocaleString()
              : "Never Run"}
          </p>

        </div>

      </div>

      {/* Actions */}

      <div className="grid grid-cols-3 gap-4 mt-8">

        <button
          onClick={() => onRun(pipeline.id)}
          disabled={running}
          className="
            bg-blue-600
            hover:bg-blue-700
            rounded-xl
            py-4
            text-lg
            font-medium
          "
        >
          ▶ Run
        </button>

        <button
          onClick={() => onLogs(pipeline.id)}
          className="
            border
            border-slate-700
            hover:bg-slate-800
            rounded-xl
            py-4
            text-lg
          "
        >
          📄 Logs
        </button>

        <button
          onClick={() => onHistory(pipeline.id)}
          className="
            border
            border-slate-700
            hover:bg-slate-800
            rounded-xl
            py-4
            text-lg
          "
        >
          🕒 History
        </button>

      </div>

    </div>
  );
}