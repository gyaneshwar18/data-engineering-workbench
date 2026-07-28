import { Search, Filter, ChevronDown, BookOpen } from "lucide-react";

const FilterToolbar = () => {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-4 p-5">
        {/* Search */}
        <div className="relative flex-1 min-w-[320px]">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search SQL problems..."
            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/70 py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
          />
        </div>

        {/* Category */}
        <button className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/70 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-white">
          <Filter className="h-4 w-4 text-cyan-400" />
          Category
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>

        {/* Difficulty */}
        <button className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/70 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-white">
          🎯
          Difficulty
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>

        {/* Problems */}
        <button className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/70 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-white">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          All Problems
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default FilterToolbar;