import { Sparkles } from "lucide-react";

const SqlLabHeader = () => {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src="/src/assets/datasets/server.svg"
          alt="SQL Lab"
          className="h-8 w-8 object-contain"
        />

        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            SQL Lab
          </h1>

          <p className="mt-0.5 text-sm text-slate-400">
            Explore and run SQL queries
          </p>
        </div>
      </div>

      {/* Workspace */}
      <div
        className="
          hidden
          items-center
          gap-3
          rounded-xl
          border
          border-slate-700/60
          bg-slate-800/60
          px-4
          py-2.5
          lg:flex
        "
      >
        <Sparkles className="h-4 w-4 text-cyan-400" />

        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
            Workspace
          </p>

          <p className="text-sm font-medium text-slate-200">
            Interactive SQL Environment
          </p>
        </div>
      </div>
    </div>
  );
};

export default SqlLabHeader;