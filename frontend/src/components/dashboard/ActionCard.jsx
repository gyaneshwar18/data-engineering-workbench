import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
  },
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
  },
  purple: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "text-violet-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
  },
};

export default function ActionCard({
  icon: Icon,
  title,
  subtitle,
  to,
  color = "blue",
}) {
  const theme = colorMap[color];

  return (
    <Link
      to={to}
      className="
        group
        flex
        items-center
        justify-between

        rounded-xl

        border
        border-slate-800

        bg-slate-900/40

        px-4
        py-3

        transition-all
        duration-200

        hover:border-slate-700
        hover:bg-slate-800/40
      "
    >
      <div className="flex items-center gap-3">

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-xl

            border

            ${theme.bg}
            ${theme.border}
          `}
        >
          <Icon
            size={18}
            className={theme.icon}
          />
        </div>

        <div>

          <h3 className="text-sm font-semibold text-white">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-slate-400">
            {subtitle}
          </p>

        </div>

      </div>

      <ChevronRight
        size={18}
        className="
          text-slate-600
          transition-transform
          duration-200
          group-hover:translate-x-1
        "
      />
    </Link>
  );
}