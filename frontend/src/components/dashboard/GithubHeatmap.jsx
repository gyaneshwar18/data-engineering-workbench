import { useEffect, useState } from "react";
import axios from "axios";
import { Github, ExternalLink } from "lucide-react";

import ContributionGrid from "./ContributionGrid";

export default function GithubHeatmap() {
  const [data, setData] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchGithubData();
  }, []);

  async function fetchGithubData() {
    try {
      const res = await axios.get(
        `${API}/github/contributions`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="
        h-full
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

        <div className="flex items-center gap-3">

          <Github
            size={22}
            className="text-white"
          />

          <div>

            <h2 className="text-lg font-semibold text-white">
              GitHub Contributions
            </h2>

            <p className="text-sm text-slate-400 mt-0.5">
              {data
                ? `${data.total_contributions} contributions • Last 12 months`
                : "Loading contributions..."}
            </p>

          </div>

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
            px-3
            py-2
            text-sm
            text-slate-300
            hover:bg-slate-800
            transition-all
          "
        >
          Profile

          <ExternalLink size={15} />
        </a>

      </div>

      {/* Body */}

      <div className="px-6 pt-4 pb-3">

        {data ? (
          <ContributionGrid
            weeks={data.weeks}
          />
        ) : (
          <div className="flex h-[120px] items-center justify-center text-slate-500">
            Loading contributions...
          </div>
        )}

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 px-6 py-2">

        <a
          href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-slate-500 hover:text-slate-300 transition"
        >
          Learn how we count contributions
        </a>

        <div className="flex items-center gap-2 text-xs text-slate-500">

          <span>Less</span>

          <div className="h-2.5 w-2.5 rounded-[2px] bg-[#161b22]" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-[#0e4429]" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-[#006d32]" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-[#26a641]" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-[#39d353]" />

          <span>More</span>

        </div>

      </div>

    </div>
  );
}