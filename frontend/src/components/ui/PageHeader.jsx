export default function PageHeader({
  title,
  subtitle,
  action,
  className = "mb-5",
}) {
  return (
    <div
      className={`
        flex
        items-start
        justify-between
        gap-4
        ${className}
      `}
    >
      <div>
        <h1 className="text-2xl font-semibold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}