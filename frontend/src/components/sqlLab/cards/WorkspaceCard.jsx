const colorStyles = {
  cyan: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    hover: "group-hover:border-cyan-500/40",
  },
  emerald: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    hover: "group-hover:border-emerald-500/40",
  },
  amber: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    hover: "group-hover:border-amber-500/40",
  },
  violet: {
    icon: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    hover: "group-hover:border-violet-500/40",
  },
};

const WorkspaceCard = ({
  title,
  description,
  icon: Icon,
  color = "cyan",
  onClick = () => { },
}) => {
  const style = colorStyles[color] || colorStyles.cyan;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
    group
    w-full
    rounded-2xl
    border
    border-slate-700/50
    bg-slate-800/50
    p-6
    text-left
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:bg-slate-800
    hover:shadow-xl
    ${style.hover}
  `}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            ${style.border}
            ${style.bg}
          `}
        >
          <Icon className={`h-5 w-5 ${style.icon}`} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-200">
            {title}
          </h3>

          <p className="mt-0.5 truncate text-xs text-slate-500">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <svg
          className="
            h-4
            w-4
            shrink-0
            text-slate-600
            transition-all
            duration-200
            group-hover:translate-x-0.5
            group-hover:text-slate-300
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  );
};

export default WorkspaceCard;