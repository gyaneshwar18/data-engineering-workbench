import { Handle, Position } from "reactflow";
import {
  CheckCircle2,
  CircleDot,
  Circle,
} from "lucide-react";

const statusStyles = {
  completed: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    icon: CheckCircle2,
    label: "Completed",
  },

  current: {
    border: "border-blue-500/40",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    icon: CircleDot,
    label: "In Progress",
  },

  planned: {
    border: "border-slate-600",
    bg: "bg-slate-800",
    text: "text-slate-400",
    icon: Circle,
    label: "Planned",
  },
};

export default function RoadmapNode({ data }) {
  const style = statusStyles[data.status];
  const Icon = style.icon;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !bg-slate-600 !border-2 !border-slate-900"
      />

      <div
        className={`
          w-[230px]
          rounded-2xl
          border
          ${style.border}
          bg-[#111113]
          p-5
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-1
          hover:shadow-xl
        `}
      >
        {/* Status */}

        <div className="flex items-center gap-2">

          <Icon
            size={16}
            className={style.text}
          />

          <span
            className={`text-xs font-medium ${style.text}`}
          >
            {style.label}
          </span>

        </div>

        {/* Title */}

        <h3 className="mt-4 text-lg font-semibold text-white">
          {data.title}
        </h3>

        {/* Subtitle */}

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {data.description}
        </p>

        {/* Footer */}

        <div className="mt-5">

          <span
            className={`
              inline-flex
              rounded-full
              px-3
              py-1
              text-xs
              font-medium
              ${style.bg}
              ${style.text}
            `}
          >
            {data.level}
          </span>

        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-slate-600 !border-2 !border-slate-900"
      />
    </>
  );
}