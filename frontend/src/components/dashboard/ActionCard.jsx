import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ActionCard({
  icon: Icon,
  title,
  subtitle,
  to,
  color = "blue",
}) {
  const colors = {
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

  const theme = colors[color];

  return (
    <Link to={to}>
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
        className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-5
          cursor-pointer
          transition-all
          hover:border-slate-700
          hover:shadow-lg
        "
      >
        <div
          className={`
            h-12
            w-12
            rounded-xl
            flex
            items-center
            justify-center
            border
            ${theme.bg}
            ${theme.border}
          `}
        >
          <Icon
            size={24}
            className={theme.icon}
          />
        </div>

        <h3 className="mt-5 text-white font-semibold text-lg">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {subtitle}
        </p>
      </motion.div>
    </Link>
  );
}