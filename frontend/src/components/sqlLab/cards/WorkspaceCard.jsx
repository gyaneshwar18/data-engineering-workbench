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
  onClick = () => {},
}) => {
  const style = colorStyles[color] || colorStyles.cyan;

  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl ${style.hover}`}
    >
      {/* Icon */}
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${style.border} ${style.bg}`}
      >
        <Icon className={`h-6 w-6 ${style.icon}`} />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">
          Open
        </span>

        <svg
          className="h-5 w-5 text-slate-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
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