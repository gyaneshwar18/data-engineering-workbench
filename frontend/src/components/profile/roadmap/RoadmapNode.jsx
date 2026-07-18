import React from "react";
import { Handle, Position } from "@xyflow/react";
import { CheckCircle2, Clock3, Circle } from "lucide-react";

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    text: "Completed",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  current: {
    icon: Clock3,
    text: "Current",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
  },
  planned: {
    icon: Circle,
    text: "Planned",
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
  },
};

const RoadmapNode = ({ data }) => {
  const config = statusConfig[data.status] || statusConfig.planned;
  const StatusIcon = config.icon;

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-slate-900 !bg-blue-500"
      />

      <div className="group w-[230px] rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/20">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white">{data.title}</h3>

        {/* Status */}
        <div
          className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${config.bg} ${config.border} ${config.color}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {config.text}
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-6 text-slate-400">
          {data.subtitle}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-slate-900 !bg-blue-500"
      />
    </>
  );
};

export default RoadmapNode;