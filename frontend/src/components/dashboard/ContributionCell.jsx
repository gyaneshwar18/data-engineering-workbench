import clsx from "clsx";

const colors = [
  "bg-slate-800",
  "bg-emerald-950",
  "bg-emerald-800",
  "bg-emerald-600",
  "bg-emerald-400",
];

export default function ContributionCell({
  level = 0,
}) {
  return (
    <div
      className={clsx(
        "w-[11px] h-[11px] rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer",
        colors[level]
      )}
    />
  );
}