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
      type="button"
      onClick={onClick}
      className={`
        group
        flex
        min-h-[108px]
        w-full
        flex-col
        items-start
        rounded-xl
        border
        border-slate-700/50
        bg-slate-800/50
        p-3
        text-left
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:bg-slate-800
        hover:shadow-lg

        ${style.hover}

        sm:min-h-0
        sm:flex-row
        sm:items-center
        sm:rounded-2xl
        sm:p-6
      `}
    >
      {/* ================================================== */}
      {/* ICON                                               */}
      {/* ================================================== */}

      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          ${style.border}
          ${style.bg}

          transition-colors
          duration-200

          sm:h-10
          sm:w-10
        `}
      >
        <Icon
          className={`
            h-[18px]
            w-[18px]
            ${style.icon}

            sm:h-5
            sm:w-5
          `}
        />
      </div>

      {/* ================================================== */}
      {/* CONTENT                                            */}
      {/* ================================================== */}

      <div
        className="
          mt-2.5
          min-w-0
          w-full

          sm:ml-3
          sm:mt-0
          sm:flex-1
        "
      >
        <h3
          className="
            line-clamp-2
            text-xs
            font-semibold
            leading-4
            text-slate-200

            sm:truncate
            sm:text-sm
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-0.5
            line-clamp-1
            text-[10px]
            leading-4
            text-slate-500

            sm:text-xs
          "
        >
          {description}
        </p>
      </div>

      {/* ================================================== */}
      {/* ARROW                                              */}
      {/* ================================================== */}

      <svg
        className="
          hidden
          h-4
          w-4
          shrink-0
          text-slate-600
          transition-all
          duration-200

          group-hover:translate-x-0.5
          group-hover:text-slate-300

          sm:ml-3
          sm:block
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

export default WorkspaceCard;