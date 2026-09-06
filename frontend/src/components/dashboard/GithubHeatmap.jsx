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
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/90

        sm:rounded-3xl
      "
    >
      {/* Header */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-3
          border-b
          border-slate-800
          px-3.5
          py-3

          sm:px-5
          sm:py-4

          md:px-6
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2.5

            sm:gap-3
          "
        >
          <Github
            size={19}
            className="
              shrink-0
              text-white

              sm:h-[22px]
              sm:w-[22px]
            "
          />

          <div className="min-w-0">
            <h2
              className="
                whitespace-nowrap
                text-[13px]
                font-semibold
                leading-5
                tracking-tight
                text-white

                sm:text-lg
              "
            >
              GitHub Contributions
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[9px]
                leading-3.5
                text-slate-400

                sm:text-sm
                sm:leading-5
              "
            >
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
            h-8
            shrink-0
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-slate-700
            px-2.5
            text-[10px]
            font-medium
            text-slate-300
            transition-all
            hover:bg-slate-800

            sm:h-auto
            sm:gap-2
            sm:px-3
            sm:py-2
            sm:text-sm
          "
        >
          Profile

          <ExternalLink
            size={13}
            className="
              sm:h-[15px]
              sm:w-[15px]
            "
          />
        </a>
      </div>

      {/* Body */}

      <div
        className="
          min-w-0
          overflow-hidden
          px-3.5
          pb-2.5
          pt-3

          sm:px-5
          sm:pb-3
          sm:pt-4

          md:px-6
        "
      >
        {data ? (
          <div className="min-w-0 overflow-x-auto">
            <ContributionGrid
              weeks={data.weeks}
            />
          </div>
        ) : (
          <div
            className="
              flex
              h-[100px]
              items-center
              justify-center
              text-xs
              text-slate-500

              sm:h-[120px]
              sm:text-sm
            "
          >
            Loading contributions...
          </div>
        )}
      </div>

      {/* Contribution Legend */}

      <div
        className="
          flex
          min-w-0
          items-center
          justify-between
          gap-2
          border-t
          border-slate-800
          px-3.5
          py-2

          sm:px-5
          sm:py-2

          md:px-6
        "
      >
        <a
          href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
          target="_blank"
          rel="noreferrer"
          className="
            min-w-0
            truncate
            text-[9px]
            text-slate-500
            transition
            hover:text-slate-300

            sm:text-xs
          "
        >
          Learn how we count contributions
        </a>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1
            text-[9px]
            text-slate-500

            sm:gap-2
            sm:text-xs
          "
        >
          <span>Less</span>

          <div className="h-2 w-2 rounded-[2px] bg-[#161b22] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-[2px] bg-[#0e4429] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-[2px] bg-[#006d32] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-[2px] bg-[#26a641] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-[2px] bg-[#39d353] sm:h-2.5 sm:w-2.5" />

          <span>More</span>
        </div>
      </div>

      {/* Insights */}

      <div
        className="
          border-t
          border-slate-800
          px-3.5
          py-3

          sm:px-5
          sm:py-4

          md:px-6
        "
      >
        <div
          className="
            grid
            grid-cols-2
            gap-x-5
            gap-y-2.5

            sm:gap-x-8
            sm:gap-y-3
          "
        >
          <div className="min-w-0">
            <p
              className="
                truncate
                text-[9px]
                text-slate-500

                sm:text-xs
              "
            >
              Total Contributions
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                font-semibold
                text-white

                sm:mt-1
                sm:text-sm
              "
            >
              {data?.total_contributions ?? "--"}
            </p>
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-[9px]
                text-slate-500

                sm:text-xs
              "
            >
              Active Weeks
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                font-semibold
                text-white

                sm:mt-1
                sm:text-sm
              "
            >
              {data?.insights?.active_weeks ?? "--"}
            </p>
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-[9px]
                text-slate-500

                sm:text-xs
              "
            >
              Longest Streak
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                font-semibold
                text-white

                sm:mt-1
                sm:text-sm
              "
            >
              {data?.insights?.longest_streak ?? "--"} Days
            </p>
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-[9px]
                text-slate-500

                sm:text-xs
              "
            >
              Last Commit
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                font-semibold
                text-white

                sm:mt-1
                sm:text-sm
              "
            >
              {data?.insights?.last_commit ?? "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}