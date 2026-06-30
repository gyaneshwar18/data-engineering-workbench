import { motion } from "framer-motion";

const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    accent: "text-blue-400",
  },

  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
    accent: "text-emerald-400",
  },

  purple: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "text-violet-400",
    accent: "text-violet-400",
  },

  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
    accent: "text-amber-400",
  },
};

export default function MetricCard({
  title,
  value,
  subtitle = "",
  icon: Icon,
  color = "blue",
}) {
  const theme = colorMap[color];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className="
        min-h-[170px]
        h-full

        rounded-3xl

        border
        border-slate-800

        bg-slate-900/90

        p-5

        shadow-sm
        hover:shadow-xl

        transition-all
        duration-300
      "
    >
      <div className="flex flex-col justify-between h-full">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-medium text-slate-400">
              {title}
            </p>

          </div>

          <div
            className={`
              h-11
              w-11

              rounded-xl

              flex
              items-center
              justify-center

              border

              ${theme.bg}
              ${theme.border}
            `}
          >
            {Icon && (
              <Icon
                size={20}
                className={theme.icon}
              />
            )}
          </div>

        </div>

        {/* Value */}

        <div className="mt-5">

          <h2 className="text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p
              className={`
                mt-2
                text-sm
                font-medium

                ${theme.accent}
              `}
            >
              {subtitle}
            </p>
          )}

        </div>

        {/* Footer */}

        <div className="mt-5 border-t border-slate-800 pt-3">

          <p className="text-xs text-slate-500">
            Updated
          </p>

        </div>

      </div>
    </motion.div>
  );
}