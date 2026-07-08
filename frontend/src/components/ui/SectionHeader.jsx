export default function SectionHeader({
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        ${className}
      `}
    >
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}