import { ExternalLink } from "lucide-react";
import ContributionGrid from "./ContributionGrid";

export default function GithubHeatmap() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 pt-6">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-xl font-semibold text-white">
              GitHub Contributions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Daily coding activity and development consistency
            </p>

          </div>

          <span
            className="
              rounded-full
              border
              border-slate-700
              bg-slate-800
              px-3
              py-1
              text-xs
              text-slate-300
            "
          >
            Last 12 Months
          </span>

        </div>

      </div>

      {/* Contribution Grid */}

      <div className="mt-6 px-6">

        <ContributionGrid />

      </div>

      {/* Footer */}

      <div
        className="
          mt-6
          border-t
          border-slate-800
          px-6
          py-4

          flex
          items-center
          justify-between
          flex-wrap
          gap-3
        "
      >

        {/* Legend */}

        <div className="flex items-center gap-2 text-xs text-slate-400">

          <span>Less</span>

          <div className="w-[10px] h-[10px] rounded-sm bg-slate-800 border border-slate-700" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-950" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-800" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-600" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-400" />

          <span>More</span>

        </div>

        <a
          href="https://github.com/gyaneshwar18"
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            gap-2
            text-sm
            text-blue-400
            hover:text-blue-300
            transition-colors
          "
        >
          View GitHub

          <ExternalLink size={15} />

        </a>

      </div>

    </div>
  );
}