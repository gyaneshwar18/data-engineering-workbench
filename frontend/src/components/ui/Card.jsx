export default function Card({
  children,
  className = ""
}) {

  return (
    <div
      className={`
        bg-[#081226]
        border
        border-slate-800
        rounded-2xl
        p-6
        shadow-lg
        hover:border-blue-500
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}