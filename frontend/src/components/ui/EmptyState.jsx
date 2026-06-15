export default function EmptyState({
  title,
  description
}) {

  return (
    <div
      className="
        bg-[#081226]
        border
        border-slate-800
        rounded-2xl
        p-10
        text-center
      "
    >
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </div>
  );
}