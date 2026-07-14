import ContributionCell from "./ContributionCell";

export default function ContributionGrid({ weeks }) {
  const monthLabels = [];

  weeks.forEach((week, index) => {
    const firstDay = week.contribution_days[0];

    const month = new Date(firstDay.date).toLocaleString("default", {
      month: "short",
    });

    if (
      index === 0 ||
      month !==
        new Date(
          weeks[index - 1].contribution_days[0].date
        ).toLocaleString("default", {
          month: "short",
        })
    ) {
      monthLabels.push(month);
    } else {
      monthLabels.push("");
    }
  });

  return (
    <div className="w-full">

      {/* Month Labels */}

      <div
        className="mb-2 grid text-[11px] text-slate-500"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, 12px)`,
          columnGap: "2px",
        }}
      >
        {monthLabels.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>

      {/* Contribution Grid */}

      <div
        className="grid grid-flow-col"
        style={{
          gridTemplateRows: "repeat(7, 12px)",
          gridAutoColumns: "12px",
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