import {
  Play,
  Save,
  Download,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";

const EditorToolbar = ({
  loading = false,
  onRun = () => {},
  onSave = () => {},
  onExport = () => {},
}) => {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await onSave();

      setSaved(true);

      // Return to Ready after 2.5 seconds
      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error("Failed to save query:", error);
    }
  };

  // If a new query starts running, clear saved state
  useEffect(() => {
    if (loading) {
      setSaved(false);
    }
  }, [loading]);

  return (
    <div
      className="
        min-w-0
        w-full

        rounded-xl
        border
        border-slate-700/50

        bg-slate-900/70
        backdrop-blur-xl

        px-3
        py-2.5

        sm:flex
        sm:items-center
        sm:justify-between
        sm:gap-4
        sm:px-4
        sm:py-3
      "
    >
      {/* ================================================== */}
      {/* ACTIONS                                            */}
      {/* ================================================== */}

      <div
        className="
          flex
          min-w-0
          w-full
          items-center
          gap-1.5

          sm:w-auto
          sm:gap-2
        "
      >
        {/* Run Query */}
        <button
          type="button"
          onClick={onRun}
          disabled={loading}
          title="Run Query"
          className="
            inline-flex
            h-10
            min-w-0
            flex-1
            items-center
            justify-center
            gap-1.5

            rounded-lg

            bg-cyan-500
            px-2.5

            text-xs
            font-semibold
            text-slate-950

            transition-all
            duration-200

            hover:bg-cyan-400
            hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]

            disabled:cursor-not-allowed
            disabled:opacity-60

            sm:h-auto
            sm:flex-none
            sm:gap-2
            sm:px-4
            sm:py-2
            sm:text-sm
          "
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin sm:h-4 sm:w-4" />
              <span className="sm:hidden">Run</span>
              <span className="hidden sm:inline">Running...</span>
            </>
          ) : (
            <>
              <Play
                className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
                fill="currentColor"
              />
              <span className="sm:hidden">Run</span>
              <span className="hidden sm:inline">Run Query</span>
            </>
          )}
        </button>

        {/* Save Query */}
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          title="Save Query"
          className="
            inline-flex
            h-10
            min-w-0
            flex-1
            items-center
            justify-center
            gap-1.5

            rounded-lg

            border
            border-slate-700/70

            bg-slate-800/70

            px-2.5

            text-xs
            font-medium
            text-slate-300

            transition-all
            duration-200

            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:h-auto
            sm:flex-none
            sm:gap-2
            sm:px-4
            sm:py-2
            sm:text-sm
          "
        >
          <Save className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span className="sm:hidden">Save</span>
          <span className="hidden sm:inline">Save Query</span>
        </button>

        {/* Export CSV */}
        <button
          type="button"
          onClick={onExport}
          disabled={loading}
          title="Export CSV"
          className="
            inline-flex
            h-10
            min-w-0
            flex-1
            items-center
            justify-center
            gap-1.5

            rounded-lg

            border
            border-slate-700/70

            bg-slate-800/70

            px-2.5

            text-xs
            font-medium
            text-slate-300

            transition-all
            duration-200

            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:h-auto
            sm:flex-none
            sm:gap-2
            sm:px-4
            sm:py-2
            sm:text-sm
          "
        >
          <Download className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span className="sm:hidden">Export</span>
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>

      {/* ================================================== */}
      {/* EXECUTION / ACTION STATUS                         */}
      {/* ================================================== */}

      <div
        className="
          mt-2
          flex
          min-h-4
          items-center
          justify-center
          gap-1.5

          sm:mt-0
          sm:min-h-0
          sm:justify-start
          sm:rounded-lg
          sm:border
          sm:border-slate-700/50
          sm:bg-slate-800/60
          sm:px-3
          sm:py-2
        "
      >
        {/* Running */}
        {loading ? (
          <>
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                animate-pulse
                rounded-full
                bg-amber-400
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                text-amber-400

                sm:text-sm
              "
            >
              Executing Query...
            </span>
          </>
        ) : saved ? (
          /* Query Saved */
          <>
            <CheckCircle2
              className="
                h-3.5
                w-3.5
                shrink-0
                text-emerald-400

                sm:h-4
                sm:w-4
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                text-emerald-400

                sm:text-sm
              "
            >
              Query Saved
            </span>
          </>
        ) : (
          /* Ready */
          <>
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                text-slate-500

                sm:text-sm
                sm:text-slate-400
              "
            >
              Ready
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default EditorToolbar;