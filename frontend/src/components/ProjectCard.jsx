import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

const logos = {
  "Data Engineering Workbench": "/logos/workbench.svg",
  "End-to-End Data Pipeline": "/logos/airflow.svg",
  "Lakehouse Analytics Platform": "/logos/databricks.svg",
  "Azure Data Platform": "/logos/azure.svg",
};

export default function ProjectCard({
  title,
  problem,
  tech,
  status,
}) {
  const logo = logos[title] || "/logos/workbench.svg";

  const badgeStyles = {
    Completed:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",

    "In Progress":
      "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-700/60
        bg-gradient-to-br
        from-slate-900
        to-slate-950
        p-7
        min-h-[420px]
        transition-all
        duration-300
        hover:border-cyan-500/30
      "
    >
      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div className="flex items-start gap-5">

          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-700
              bg-slate-800/70
              transition-all
              duration-300
              group-hover:border-cyan-500/30
            "
          >
            <img
              src={logo}
              alt={title}
              className="h-11 w-11 object-contain"
            />
          </div>

          <div>

            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white">
              {title}
            </h3>

            <div
              className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${badgeStyles[status]}`}
            >
              <span className="h-2 w-2 rounded-full bg-current"></span>

              {status}
            </div>

          </div>

        </div>

      </div>

      {/* DESCRIPTION */}

      <p className="mt-8 text-[17px] leading-8 text-slate-400">
        {problem}
      </p>

      {/* TECH STACK */}

      <div className="mt-7 flex flex-wrap gap-3">
        {tech.slice(0, 5).map((item) => (
          <span
            key={item}
            className="
              rounded-lg
              bg-slate-800
              px-4
              py-2
              text-sm
              text-slate-300
              transition-colors
              duration-300
              group-hover:bg-slate-700
            "
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-8 border-t border-slate-700/60 pt-6">

              <a
          href="#"
          className="
            inline-flex
            items-center
            gap-3
            text-base
            font-medium
            text-cyan-400
            transition-all
            duration-300
            hover:gap-4
            hover:text-cyan-300
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-slate-800
              border
              border-slate-700
              transition-colors
              duration-300
              group-hover:border-cyan-500/30
            "
          >
            <Github size={18} />
          </div>

          <span>Source Code</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

      </div>
    </motion.div>
  );
}