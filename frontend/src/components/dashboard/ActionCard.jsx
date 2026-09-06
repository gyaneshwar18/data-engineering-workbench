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
  onClick,
  color = "blue",
}) {
  const theme = colorMap[color];

  const className = `
    group
    flex
    min-w-0
    w-full
    items-center
    justify-between
    gap-2.5
    rounded-xl
    border
    border-slate-800
    bg-slate-900/40
    px-3
    py-2.5
    text-left
    transition-all
    duration-200

    hover:border-slate-700
    hover:bg-slate-800/40

    sm:gap-3
    sm:px-4
    sm:py-3
  `;

  const content = (
    <>
      <div
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-2.5

          sm:gap-3
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
            rounded-lg
            border

            sm:h-9
            sm:w-9
            sm:rounded-xl

            ${theme.bg}
            ${theme.border}
          `}
        >
          <Icon
            size={16}
            className={`
              ${theme.icon}

              sm:h-[18px]
              sm:w-[18px]
            `}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate
              text-xs
              font-semibold
              leading-5
              text-white

              sm:text-sm
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-0.5
              truncate
              text-[10px]
              leading-4
              text-slate-400

              sm:text-xs
            "
          >
            {subtitle}
          </p>
        </div>
      </div>

      <ChevronRight
        size={16}
        className="
          shrink-0
          text-slate-600
          transition-transform
          duration-200

          group-hover:translate-x-1

          sm:h-[18px]
          sm:w-[18px]
        "
      />
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={className}
    >
      {content}
    </Link>
  );
}