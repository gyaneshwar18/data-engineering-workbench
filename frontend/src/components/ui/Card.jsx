export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
            bg-slate-900/80
            border
            border-slate-800
            rounded-xl
            p-5
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-blue-500/30
            ${className}
      `}
    >
      {children}
    </div>
  );
}