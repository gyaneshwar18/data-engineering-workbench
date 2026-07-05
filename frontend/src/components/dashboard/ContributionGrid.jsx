import ContributionCell from "./ContributionCell";

const WEEK_COUNT = 53;
const DAYS = 7;

// Temporary random data.
// Later we'll replace this with real GitHub data.
const generateDummyData = () => {
  return Array.from({ length: WEEK_COUNT }, () =>
    Array.from({ length: DAYS }, () =>
      Math.floor(Math.random() * 5)
    )
  );
};

const contributionData = generateDummyData();

const months = [
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
];

const monthPositions = [
  0,
  4,
  8,
  13,
  17,
  22,
  27,
  31,
  36,
  41,
  46,
  50,
];

const weekdays = [
  "Mon",
  "",
  "Wed",
  "",
  "Fri",
  "",
  "",
];

export default function ContributionGrid() {
  return (
    <div className="overflow-x-auto">

      {/* Month Labels */}

      <div className="flex ml-10 mb-2 relative h-5">

        {months.map((month, index) => (
          <span
            key={month}
            className="absolute text-xs text-slate-400"
            style={{
              left: `${monthPositions[index] * 15}px`,
            }}
          >
            {month}
          </span>
        ))}

      </div>

      <div className="flex">

        {/* Weekday Labels */}

        <div className="flex flex-col justify-between mr-3">

          {weekdays.map((day, index) => (
            <span
              key={index}
              className="text-xs text-slate-400 h-[15px]"
            >
              {day}
            </span>
          ))}

        </div>

        {/* Contribution Grid */}

        <div className="flex gap-[3px]">

          {contributionData.map((week, weekIndex) => (

            <div
              key={weekIndex}
              className="flex flex-col gap-[3px]"
            >

              {week.map((level, dayIndex) => (

                <ContributionCell
                  key={dayIndex}
                  level={level}
                />

              ))}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}