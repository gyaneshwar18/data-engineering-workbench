import {GitHubCalendar} from "react-github-calendar";
import { ExternalLink } from "lucide-react";

export default function GithubHeatmap() {
  return (
    <div
      className="
        flex
        h-full
        flex-col

        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90

        overflow-hidden
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between border-b border-slate-800 px-6 py-5">

        <div>

          <h2 className="text-xl font-semibold text-white">
            GitHub Contributions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Daily coding activity over the last 12 months
          </p>

        </div>

        <a
          href="https://github.com/gyaneshwar18"
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            gap-2

            rounded-lg

            border
            border-slate-700

            bg-slate-800

            px-3
            py-2

            text-sm
            text-slate-300

            transition

            hover:border-slate-600
            hover:bg-slate-700
          "
        >
          View Profile

          <ExternalLink size={15} />
        </a>

      </div>

      {/* Calendar */}

      <div className="flex-1 px-6 py-6 overflow-x-auto">

        <GitHubCalendar
          username="gyaneshwar18"
          blockSize={12}
          blockMargin={5}
          fontSize={14}
          colorScheme="dark"
          hideMonthLabels={false}
        />

      </div>

    </div>
  );
}