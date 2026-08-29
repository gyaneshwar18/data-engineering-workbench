import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <header
      className="
        flex
        h-[72px]
        w-full
        items-center
        justify-between
        border-b
        border-slate-800/80
        bg-slate-950/95
        px-7
        backdrop-blur-xl
      "
    >
      {/* ========================================================= */}
      {/* LEFT — WORKBENCH CONTEXT                                  */}
      {/* ========================================================= */}

      <div className="min-w-0">
        <h2
          className="
            truncate
            text-lg
            font-semibold
            leading-6
            tracking-tight
            text-slate-100
          "
        >
          Data Engineering Workbench
        </h2>

        <p
          className="
            mt-0.5
            text-xs
            font-medium
            leading-4
            text-slate-500
          "
        >
          Platform overview
        </p>
      </div>

      {/* ========================================================= */}
      {/* RIGHT — PERSONAL PROFILE                                  */}
      {/* ========================================================= */}

      <Link
        to="/workbench/profile"
        aria-label="View Gyaneshwar's profile"
        className="
    group
    relative

    flex
    items-center
    gap-3

    py-1.5

    transition-all
    duration-200

    focus:outline-none
  "
      >
        {/* ======================================================= */}
        {/* TOOLTIP                                                 */}
        {/* ======================================================= */}

        <span
          className="
            pointer-events-none
            invisible
            absolute
            right-0
            top-full
            z-50
            mt-1.5
            whitespace-nowrap
            rounded-lg
            border
            border-slate-700/80
            bg-slate-800
            px-3
            py-1.5
            text-xs
            font-medium
            text-slate-100
            shadow-lg
            shadow-black/30
            opacity-0
            translate-y-[-2px]
            transition-all
            duration-150
            group-hover:visible
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          View my profile

          {/* Tooltip pointer */}

          <span
            className="
              absolute
              -top-1
              right-5
              h-2
              w-2
              rotate-45
              border-l
              border-t
              border-slate-700/80
              bg-slate-800
            "
          />
        </span>

        {/* ======================================================= */}
        {/* AVATAR                                                  */}
        {/* ======================================================= */}

        <div
          className="
            relative
            h-10
            w-10
            shrink-0
            rounded-full
            transition-transform
            duration-200
            group-hover:scale-[1.03]
          "
        >
          {/* Soft premium glow */}

          <div
            className="
              absolute
              -inset-1.5
              rounded-full
              bg-blue-500/15
              opacity-80
              blur-md
              transition-all
              duration-200
              group-hover:bg-blue-500/25
              group-hover:opacity-100
            "
          />

          {/* Avatar image */}

          <div
            className="
              relative
              h-10
              w-10
              overflow-hidden
              rounded-full
              bg-slate-900
              shadow-[0_0_14px_rgba(59,130,246,0.16)]
              transition-all
              duration-200
              group-hover:shadow-[0_0_22px_rgba(59,130,246,0.28)]
            "
          >
            <img
              src="/images/developer-avatar.svg"
              alt="Gyaneshwar"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>
        </div>

        {/* ======================================================= */}
        {/* NAME                                                    */}
        {/* ======================================================= */}

        <span
          className="
            hidden
            text-sm
            font-semibold
            tracking-tight
            text-slate-200
            transition-colors
            duration-200
            group-hover:text-white
            sm:block
          "
        >
          Gyaneshwar
        </span>

        {/* ======================================================= */}
        {/* NAVIGATION ARROW                                        */}
        {/* ======================================================= */}

        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="
            h-4
            w-4
            text-slate-600
            transition-all
            duration-200
            group-hover:translate-x-0.5
            group-hover:text-blue-400
          "
          aria-hidden="true"
        >
          <path
            d="M7.5 4.5L13 10L7.5 15.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </header>
  );
}