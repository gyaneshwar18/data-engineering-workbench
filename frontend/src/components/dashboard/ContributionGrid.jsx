import { useLayoutEffect, useRef } from "react";
import ContributionCell from "./ContributionCell";

export default function ContributionGrid({ weeks }) {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (!gridRef.current) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    if (!isMobile) {
      return;
    }

    const scrollContainer =
      gridRef.current.closest(".overflow-x-auto");

    if (!scrollContainer) {
      return;
    }

    const scrollToLatest = () => {
      scrollContainer.scrollLeft =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
    };

    requestAnimationFrame(scrollToLatest);
  }, [weeks]);

  const monthLabels = [];

  let previousLabelIndex = -10;

  weeks.forEach((week, index) => {
    const month = new Date(
      week.contribution_days[0].date
    ).toLocaleString("default", {
      month: "short",
    });

    const previousMonth =
      index > 0
        ? new Date(
            weeks[index - 1].contribution_days[0].date
          ).toLocaleString("default", {
            month: "short",
          })
        : null;

    if (
      index === 0 ||
      (month !== previousMonth &&
        index - previousLabelIndex >= 4)
    ) {
      monthLabels.push(month);
      previousLabelIndex = index;
    } else {
      monthLabels.push("");
    }
  });

  return (
    <div ref={gridRef} className="w-full">
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