import { Database, Sparkles } from "lucide-react";

const SqlLabHeader = () => {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Left */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
            <Database className="h-7 w-7 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              SQL Lab
            </h1>

            <p className="mt-2 text-[15px] leading-7 text-slate-400">
              Practice SQL with production-style datasets, execute queries,
              analyze results, and visualize insights in one workspace.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/60 px-5 py-3">
          <Sparkles className="h-5 w-5 text-cyan-400" />

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Workspace
            </p>

            <p className="text-sm font-semibold text-slate-200">
              Interactive SQL Environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlLabHeader;