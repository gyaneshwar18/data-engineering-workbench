import ContributionCell from "./ContributionCell";

const monthLabels = [
  "Jul",
  "",
  "",
  "",
  "Aug",
  "",
  "",
  "",
  "Sep",
  "",
  "",
  "",
  "Oct",
  "",
  "",
  "",
  "Nov",
  "",
  "",
  "",
  "Dec",
  "",
  "",
  "",
  "Jan",
  "",
  "",
  "",
  "Feb",
  "",
  "",
  "",
  "Mar",
  "",
  "",
  "",
  "Apr",
  "",
  "",
  "",
  "May",
  "",
  "",
  "",
  "Jun",
];

export default function ContributionGrid({ weeks }) {
  return (
    <div className="overflow-x-auto">

      {/* Months */}

      <div
        className="grid mb-2 text-[11px] text-slate-500"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, 13px)`,
          columnGap: "2px",
        }}
      >
        {weeks.map((_, index) => (
          <div key={index}>
            {monthLabels[index] || ""}
          </div>
        ))}
      </div>

      {/* Grid */}

      <div
        className="grid grid-flow-col"
        style={{
          gridTemplateRows: "repeat(7, 13px)",
          gridAutoColumns: "13px",
          gap: "2px",
        }}
      >
        {weeks.map((week, weekIndex) =>
          week.contribution_days.map((day, dayIndex) => (
            <ContributionCell
              key={`${weekIndex}-${dayIndex}`}
              day={day}
            />
          ))
        )}
      </div>

    </div>
  );
}