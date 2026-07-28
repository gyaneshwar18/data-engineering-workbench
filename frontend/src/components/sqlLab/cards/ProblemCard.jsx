const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

const ProblemCard = ({
  problem,
  active = false,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 ${
        active
          ? "border-cyan-500/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
          : "border-slate-700/50 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
      }`}
    >
      {/* Title */}
      <h3
        className={`text-sm font-semibold transition-colors ${
          active
            ? "text-cyan-300"
            : "text-white group-hover:text-cyan-300"
        }`}
      >
        {problem.title}
      </h3>

      {/* Category */}
      <p className="mt-2 text-xs text-slate-400">
        {problem.category}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
            difficultyStyles[problem.difficulty] ||
            "bg-slate-700 text-slate-300"
          }`}
        >
          {problem.difficulty}
        </span>

        <span className="text-xs text-slate-500">
          #{problem.id}
        </span>
      </div>
    </button>
  );
};

export default ProblemCard;