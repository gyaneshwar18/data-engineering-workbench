import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  title,
  problem,
  tech,
  impact,
  status = "Production"
}) {
  return (

    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="
        bg-white/90 backdrop-blur
        rounded-2xl p-6
        border border-gray-100
        shadow-sm hover:shadow-lg
        transition
        dark:bg-gray-900/80 dark:border-gray-800
      "
    >

      {/* Header */}
      <div className="flex justify-between items-start mb-3">

        <h3 className="
          text-lg font-semibold
          text-gray-800 dark:text-gray-100
          tracking-tight
        ">
          {title}
        </h3>

        <span className="
          text-xs px-3 py-1 rounded-full
          bg-green-100 text-green-700
          dark:bg-green-900/40 dark:text-green-300
        ">
          {status}
        </span>

      </div>

      {/* Problem */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
        {problem}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tech.map(t => (
          <span
            key={t}
            className="
              text-xs px-3 py-1 rounded-lg
              bg-gray-100 text-gray-700
              dark:bg-gray-800 dark:text-gray-300
            "
          >
            {t}
          </span>
        ))}
      </div>

      {/* Impact Strip */}
      <div className="
        mb-5 p-3 rounded-xl
        bg-linear-to-r from-blue-50 to-indigo-50
        dark:from-blue-900/30 dark:to-indigo-900/30
        text-sm font-medium
        text-blue-700 dark:text-blue-300
      ">
        🚀 Impact: {impact}
      </div>

      {/* Actions */}
      <div className="flex gap-3">

        <button className="
          flex items-center gap-2
          px-4 py-2 text-sm
          bg-blue-600 text-white
          rounded-xl hover:bg-blue-700
          transition
        ">
          Case Study <ArrowUpRight size={16}/>
        </button>

        <button className="
          flex items-center gap-2
          px-4 py-2 text-sm
          border rounded-xl
          dark:border-gray-700 dark:text-gray-200
        ">
          <Github size={16}/>
          Code
        </button>

      </div>

    </motion.div>
  );
}
