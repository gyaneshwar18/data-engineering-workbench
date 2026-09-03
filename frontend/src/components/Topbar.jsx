import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <header
      className="
        flex
        h-[72px]
        w-full
        shrink-0
        items-center
        justify-between

        border-b
        border-slate-800/80

        bg-slate-950/95

        px-4
        backdrop-blur-xl

        sm:px-5
        md:px-6
        lg:px-7
      "
    >
      {/* Application identity */}
      <div className="min-w-0">
        {/* Desktop */}
        <h2
          className="
            hidden
            text-lg
            font-semibold
            leading-6
            tracking-tight
            text-slate-100
            lg:block
          "
        >
          Data Engineering Workbench
        </h2>

        {/* Mobile / Tablet */}
        <h2
          className="
            block
            text-base
            font-semibold
            leading-6
            tracking-tight
            text-slate-100
            lg:hidden
          "
        >
          Workbench
        </h2>

        <p
          className="
            mt-0.5
            text-[11px]
            font-medium
            leading-4
            text-slate-500
            sm:text-xs
          "
        >
          Platform overview
        </p>
      </div>

      {/* Profile */}
      <Link
        to="/workbench/profile"
        aria-label="View Gyaneshwar's profile"
        className="
          group
          relative
          ml-3
          flex
          shrink-0
          items-center
          gap-2
          py-1.5

          transition-all
          duration-200

          focus:outline-none

          sm:ml-4
          sm:gap-3
        "
      >
        {/* Profile tooltip */}
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
        </span>

        {/* Avatar */}
        <div
          className="
            relative
            h-9
            w-9
            shrink-0
            rounded-full

            transition-transform
            duration-200

            group-hover:scale-[1.03]

            sm:h-10
            sm:w-10
          "
        >
          {/* Subtle avatar glow */}
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

          <div
            className="
              relative
              h-9
              w-9
              overflow-hidden
              rounded-full

              bg-slate-900

              shadow-[0_0_14px_rgba(59,130,246,0.16)]

              transition-all
              duration-200

              group-hover:shadow-[0_0_22px_rgba(59,130,246,0.28)]

              sm:h-10
              sm:w-10
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

        {/* Profile name */}
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

        {/* Profile navigation indicator */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="
            hidden
            h-4
            w-4

            text-slate-600

            transition-all
            duration-200

            group-hover:translate-x-0.5
            group-hover:text-blue-400

            sm:block
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