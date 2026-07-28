import { Database } from "lucide-react";
import ProblemCard from "../cards/ProblemCard";

const sampleProblems = [
  {
    id: 1,
    title: "Top Customers by Revenue",
    category: "Aggregation",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Rank Employees by Salary",
    category: "Window Function",
    difficulty: "Hard",
  },
  {
    id: 3,
    title: "Monthly Sales Trend",
    category: "Group By",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Customers Without Orders",
    category: "Joins",
    difficulty: "Medium",
  },
  {
    id: 5,
    title: "Highest Paid Employee",
    category: "Subquery",
    difficulty: "Easy",
  },
];

const ProblemsSidebar = ({
  problems = sampleProblems,
  selectedId = 1,
  onSelect = () => {},
}) => {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
            <Database className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              SQL Problems
            </h2>

            <p className="text-xs text-slate-500">
              {problems.length} Available
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[700px] space-y-3 overflow-y-auto p-4">
        {problems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            active={selectedId === problem.id}
            onClick={() => onSelect(problem)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProblemsSidebar;