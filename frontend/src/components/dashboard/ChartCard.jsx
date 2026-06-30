import { motion } from "framer-motion";

export default function ChartCard({
  title,
  description,
  icon: Icon,
  children,
  footer,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-800">

        <div className="flex items-center gap-4">

          {Icon && (
            <div
              className="
                h-11
                w-11

                rounded-xl

                bg-blue-500/10

                border
                border-blue-500/20

                flex
                items-center
                justify-center
              "
            >
              <Icon
                size={20}
                className="text-blue-400"
              />
            </div>
          )}

          <div>

            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-slate-400 mt-1">
                {description}
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="p-6">
        {children}
      </div>

      {/* Footer */}

      {footer && (
        <div className="border-t border-slate-800 px-6 py-4">

          <p className="text-xs text-slate-500">
            {footer}
          </p>

        </div>
      )}

    </motion.div>
  );
}