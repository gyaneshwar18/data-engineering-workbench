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
  iconSrc,
  color = "blue",
}) {
  const theme = colorMap[color];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
      }}
      className="
        h-full
        min-h-[145px]

        rounded-3xl
        border
        border-slate-800

        bg-slate-900/90

        px-5
        py-4

        transition-all
        duration-300

        hover:border-slate-700
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">

        {/* Left */}

        <div className="flex-1 min-w-0">

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2
            className="
              mt-4
              text-[2rem]
              xl:text-3xl
              font-semibold
              tracking-tight
              text-white
              leading-tight
            "
          >
            {value}
          </h2>

          {subtitle && (
            <p
              className={`
                mt-1.5
                text-sm
                font-medium
                ${theme.accent}
              `}
            >
              {subtitle}
            </p>
          )}

        </div>

        {/* Icon */}

        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center

            rounded-2xl

            border

            ${theme.bg}
            ${theme.border}
          `}
        >

          {iconSrc ? (
            <img
              src={iconSrc}
              alt=""
              className="
                h-8
                w-8
                object-contain
              "
            />
          ) : (
            Icon && (
              <Icon
                size={22}
                className={theme.icon}
              />
            )
          )}

        </div>

      </div>
    </motion.div>
  );
}