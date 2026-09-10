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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-slate-700/60
        bg-gradient-to-br
        from-slate-900
        to-slate-950
        p-4
        transition-all
        duration-300
        hover:border-cyan-500/30

        sm:rounded-2xl
        sm:p-5
      "
    >
      {/* HEADER */}

      <div className="flex min-w-0 items-start">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-slate-700
            bg-slate-800/70
            transition-all
            duration-300
            group-hover:border-cyan-500/30

            sm:h-12
            sm:w-12
            sm:rounded-xl
          "
        >
          <img
            src={logo}
            alt={title}
            className="
              h-6
              w-6
              object-contain

              sm:h-8
              sm:w-8
            "
          />
        </div>

        <div className="ml-3 min-w-0 flex-1 sm:ml-4">
          <h3
            className="
              text-base
              font-semibold
              leading-5
              tracking-tight
              text-white

              sm:text-lg
              sm:leading-6
            "
          >
            {title}
          </h3>

          <div
            className={`
              mt-2
              inline-flex
              items-center
              gap-1.5
              rounded-full
              px-2
              py-0.5
              text-[10px]
              font-medium

              sm:mt-2.5
              sm:px-2.5
              sm:py-1
              sm:text-xs

              ${badgeStyles[status]}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />

            {status}
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          mt-4
          text-xs
          leading-5
          text-slate-400

          sm:mt-5
          sm:text-sm
          sm:leading-6
        "
      >
        {problem}
      </p>

      {/* TECH STACK */}

      <div
        className="
          mt-4
          flex
          flex-wrap
          gap-1.5

          sm:mt-5
          sm:gap-2
        "
      >
        {tech.slice(0, 5).map((item) => (
          <span
            key={item}
            className="
              rounded-md
              bg-slate-800
              px-2
              py-1
              text-[10px]
              text-slate-300
              transition-colors
              duration-300
              group-hover:bg-slate-700

              sm:rounded-lg
              sm:px-2.5
              sm:py-1.5
              sm:text-xs
            "
          >
            {item}
          </span>
        ))}
      </div>

      {/* FOOTER */}

      <div
        className="
          mt-5
          border-t
          border-slate-700/60
          pt-4

          sm:mt-6
          sm:pt-5
        "
      >
        <a
          href="#"
          className="
            inline-flex
            items-center
            gap-1.5
            text-xs
            font-medium
            text-cyan-400
            transition-all
            duration-300
            hover:gap-2.5
            hover:text-cyan-300

            sm:gap-2
            sm:text-sm
            sm:hover:gap-3
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-slate-700
              bg-slate-800
              transition-colors
              duration-300
              group-hover:border-cyan-500/30

              sm:h-9
              sm:w-9
            "
          >
            <Github
              size={14}
              className="sm:h-4 sm:w-4"
            />
          </div>

          <span>Source Code</span>

          <ArrowRight
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1

              sm:h-4
              sm:w-4
            "
          />
        </a>
      </div>
    </motion.div>
  );
}