import { motion } from "framer-motion";

export default function MetricCard({ title, value }) {
  return (
    <motion.div
  whileHover={{ y: -6 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="
  rounded-2xl p-6
  border border-gray-200 dark:border-gray-800
  bg-white shadow-sm
  dark:bg-gray-900
  transition
"
>


      <p className="text-xs uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <p className="text-3xl font-bold mt-2 text-gray-900">
        {value}
      </p>

      <div className="mt-3 h-1 w-12 bg-blue-500 rounded" />

    </motion.div>
  );
}
