export default function Card({
  children,
  className = ""
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
        hover:border-slate-700
        ${className}
      `}
    >
      {children}
    </div>
  );
}