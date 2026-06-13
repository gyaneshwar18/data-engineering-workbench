export default function LoadingSkeleton() {

  return (
    <div
      className="
        animate-pulse
        bg-[#081226]
        border
        border-slate-800
        rounded-2xl
        p-6
      "
    >
      <div className="h-5 bg-slate-700 rounded mb-4"></div>

      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    </div>
  );
}