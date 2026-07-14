import githubColors from "./githubColors";

export default function ContributionCell({ day }) {
  return (
    <div
      title={`${day.date} • ${day.contribution_count} contributions`}
      className="
        h-[10px]
        w-[10px]
        rounded-[2px]
        transition-all
        duration-150
        hover:scale-110
        hover:ring-1
        hover:ring-slate-300/40
        cursor-pointer
      "
      style={{
        backgroundColor:
          githubColors[day.contribution_level] ||
          githubColors.NONE,
      }}
    />
  );
}