import { motion } from "framer-motion";
import {
  DatabaseZap,
  Workflow,
  Warehouse,
  Cloud,
  Github,
  ArrowUpRight,
} from "lucide-react";

export default function ProjectCard({
  title,
  problem,
  tech,
  status,
}) {
  const icons = {
    "Data Engineering Workbench": DatabaseZap,
    "End-to-End Data Pipeline": Workflow,
    "Lakehouse Analytics Platform": Warehouse,
    "Azure Data Platform": Cloud,
  };

  const Icon = icons[title] || DatabaseZap;

  const statusStyles = {
    Production:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    Development:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",

    Research:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        group
        rounded-xl
        border
        border-slate-700/60
        bg-gradient-to-br
        from-slate-900
        to-slate-950
        p-5
        transition-all
        duration-300
        hover:border-cyan-500/25
        hover:shadow-xl
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              transition-colors
              group-hover:border-cyan-500/30
            "
          >
            <Icon
              size={18}
              className="text-cyan-400"
            />
          </div>

          <div>

            <h3 className="font-semibold text-white">
              {title}
            </h3>

            <div
              className={`
                mt-1
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-2.5
                py-1
                text-[11px]
                font-medium
                ${
                  statusStyles[status]
                }
              `}
            >
              <span className="h-2 w-2 rounded-full bg-current" />

              {status}
            </div>

          </div>

        </div>

      </div>

      {/* Description */}

      <p className="mt-5 text-sm leading-6 text-slate-400 line-clamp-3">
        {problem}
      </p>

      {/* Tech */}

      <div className="mt-5 flex flex-wrap gap-2">
        {tech.slice(0, 5).map((item) => (
          <span
            key={item}
            className="
              rounded-md
              border
              border-slate-700
              bg-slate-800/60
              px-2.5
              py-1
              text-[11px]
              font-medium
              text-slate-300
              transition-colors
              hover:border-cyan-500/25
              hover:text-white
            "
          >
            {item}
          </span>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <button
          className="
            flex
            items-center
            gap-1
            text-sm
            font-medium
            text-slate-300
            transition-colors
            hover:text-cyan-400
          "
        >
          <Github size={16} />

          GitHub
        </button>

        <button
          className="
            flex
            items-center
            gap-1
            text-sm
            font-medium
            text-cyan-400
            transition-all
            hover:gap-2
          "
        >
          Live Demo

          <ArrowUpRight size={16} />
        </button>

      </div>

    </motion.div>
  );
}