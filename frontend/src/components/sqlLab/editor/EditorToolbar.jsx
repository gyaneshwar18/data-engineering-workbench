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
        flex
        flex-wrap
        items-center
        justify-between
        gap-4

        rounded-xl
        border
        border-slate-700/50

        bg-slate-900/70
        backdrop-blur-xl

        px-4
        py-3
      "
    >
      {/* ================================================== */}
      {/* ACTIONS                                            */}
      {/* ================================================== */}

      <div className="flex items-center gap-2">

        {/* Run Query */}
        <button
          type="button"
          onClick={onRun}
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2

            rounded-lg

            bg-cyan-500
            px-4
            py-2

            text-sm
            font-semibold
            text-slate-950

            transition-all
            duration-200

            hover:bg-cyan-400
            hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play
                className="h-4 w-4"
                fill="currentColor"
              />
              Run Query
            </>
          )}
        </button>

        {/* Save Query */}
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2

            rounded-lg

            border
            border-slate-700/70

            bg-slate-800/70

            px-4
            py-2

            text-sm
            font-medium
            text-slate-300

            transition-all
            duration-200

            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Save className="h-4 w-4" />
          Save Query
        </button>

        {/* Export CSV */}
        <button
          type="button"
          onClick={onExport}
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2

            rounded-lg

            border
            border-slate-700/70

            bg-slate-800/70

            px-4
            py-2

            text-sm
            font-medium
            text-slate-300

            transition-all
            duration-200

            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* ================================================== */}
      {/* EXECUTION / ACTION STATUS                         */}
      {/* ================================================== */}

      <div
        className="
          flex
          items-center
          gap-2

          rounded-lg
          border
          border-slate-700/50

          bg-slate-800/60

          px-3
          py-2
        "
      >
        {/* Running */}
        {loading ? (
          <>
            <span
              className="
                h-2
                w-2
                rounded-full
                animate-pulse
                bg-amber-400
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-amber-400
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
                h-4
                w-4
                text-emerald-400
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-emerald-400
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
                h-2
                w-2
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-slate-400
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