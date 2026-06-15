export default function PageHeader({
  title,
  subtitle,
  action
}) {

  return (
    <div className="flex items-center justify-between mb-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {action}

    </div>
  );
}