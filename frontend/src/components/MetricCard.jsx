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
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className="
        h-full
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-6
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Top */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

        </div>

        <div
          className={`
            h-12
            w-12

            rounded-2xl

            flex
            items-center
            justify-center

            ${theme.bg}
            ${theme.border}
            border
          `}
        >
          {Icon && (
            <Icon
              size={22}
              className={theme.icon}
            />
          )}
        </div>

      </div>

      {/* Value */}

      <div className="mt-6">

        <h2 className="text-4xl font-bold text-white">
          {value}
        </h2>

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

      </div>

      {/* Footer */}

      <div className="mt-6 border-t border-slate-800 pt-4">

        <p className="text-xs uppercase tracking-wider text-slate-500">
          Updated just now
        </p>

      </div>

    </motion.div>
  );
}