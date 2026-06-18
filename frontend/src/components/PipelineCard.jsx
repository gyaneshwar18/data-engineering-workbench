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
        rounded-2xl
        p-5
        hover:border-blue-500/30
        hover:-translate-y-0.5
        transition-all
        duration-200
      "
        >
            {/* Header */}

            <div className="flex justify-between items-start">

                <div className="flex gap-4">

                    <div
                        className="
              h-12
              w-12
              rounded-xl
              bg-slate-800
              flex
              items-center
              justify-center
              text-2xl
            "
                    >
                        {getIcon()}
                    </div>

                    <div>

                        <h2 className="text-xl font-semibold text-white">
                            {pipeline.name}
                        </h2>

                        <p className="text-slate-400 text-sm mt-1">
                            {pipeline.source} → {pipeline.destination}
                        </p>

                    </div>

                </div>

                <button
                    className="
            text-slate-500
            hover:text-white
            text-lg
            transition
          "
                >
                    ⋮
                </button>

            </div>

            <div className="border-t border-slate-800 my-5"></div>

            {/* Status */}

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <p
                        className="
              text-[10px]
              uppercase
              tracking-widest
              text-slate-500
              mb-2
            "
                    >
                        Status
                    </p>

                    <StatusBadge status={pipeline.status} />

                </div>

                <div>

                    <p
                        className="
              text-[10px]
              uppercase
              tracking-widest
              text-slate-500
              mb-2
            "
                    >
                        Last Run
                    </p>

                    <p className="text-sm text-slate-300">
                        {pipeline.last_run
                            ? new Date(
                                pipeline.last_run
                            ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })
                            : "Never Run"}
                    </p>

                </div>

            </div>

            {/* Actions */}

            <div className="grid grid-cols-3 gap-3 mt-6">

                <button
                    className="
                            h-12
                            rounded-xl
                            bg-blue-500/10
                            border border-blue-500/20
                            text-blue-300
                            hover:bg-blue-500/15
                            text-base
                            font-medium
                            transition-all
                            duration-200
                            "
                >
                    <span className="text-blue-400">▶</span> Run
                </button>

                <button
                    onClick={() => onLogs(pipeline.id)}
                    className="
            h-12
            rounded-xl
           bg-amber-500/10
            border border-amber-500/20
            text-amber-300
            hover:bg-amber-500/15
            text-base
            font-medium
            transition-all
            duration-200
            "
                >
                    📄 Logs
                </button>

                <button
                    onClick={() => onHistory(pipeline.id)}
                    className="
            h-12
            rounded-xl
            bg-purple-500/10
            border border-purple-500/20
            text-purple-300
            hover:bg-purple-500/15
            text-base
            font-medium
            transition-all
            duration-200
            "

                >
                    🕒 History
                </button>

            </div>

        </div>
    );
}