import {
  Play,
  Save,
  Download,
  Loader2,
} from "lucide-react";

const EditorToolbar = ({
  loading = false,
  onRun = () => {},
  onSave = () => {},
  onExport = () => {},
}) => {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        {/* Left */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Run */}
          <button
            onClick={onRun}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Query
              </>
            )}
          </button>

          {/* Save */}
          <button
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-500/40 hover:bg-slate-700"
          >
            <Save className="h-4 w-4" />
            Save Query
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-500/40 hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              loading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
            }`}
          />

          <span className="text-sm text-slate-300">
            {loading ? "Executing Query..." : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;