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
      whileHover={{ y: -3 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
      }}
      className="
        h-full
        min-w-0

        rounded-2xl
        border
        border-slate-800

        bg-slate-900/90

        px-3.5
        py-3.5

        transition-all
        duration-300

        hover:border-slate-700
        hover:shadow-lg

        sm:rounded-3xl
        sm:px-4
        sm:py-4

        md:px-5
      "
    >
      <div className="flex min-w-0 items-start justify-between gap-2.5 sm:gap-3">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <p
            className="
              truncate
              text-xs
              font-medium
              text-slate-400

              sm:text-sm
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2
              truncate
              text-2xl
              font-semibold
              leading-tight
              tracking-tight
              text-white

              sm:mt-3
              sm:text-[2rem]

              xl:text-3xl
            "
          >
            {value}
          </h2>

          {subtitle && (
            <p
              className={`
                mt-1
                truncate
                text-[11px]
                font-medium

                sm:mt-1.5
                sm:text-sm

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
            h-8
            w-8
            shrink-0
            items-center
            justify-center

            rounded-lg

            border

            sm:h-10
            sm:w-10
            sm:rounded-xl

            ${theme.bg}
            ${theme.border}
          `}
        >
          {Icon && (
            <Icon
              size={16}
              className={`
                ${theme.icon}

                sm:h-[18px]
                sm:w-[18px]
              `}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}