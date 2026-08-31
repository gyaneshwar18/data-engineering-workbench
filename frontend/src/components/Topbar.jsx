import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Topbar({
  sidebarExpanded = false,
  onMenuToggle,
}) {
  return (
    <header
      className="
        flex
        h-[64px]
        w-full
        shrink-0
        items-center
        justify-between

        border-b
        border-slate-800/80

        bg-slate-950/95

        px-4
        sm:px-5
        md:h-[72px]
        md:px-7

        backdrop-blur-xl
      "
    >
      {/* ========================================================= */}
      {/* LEFT — MOBILE MENU + WORKBENCH CONTEXT                   */}
      {/* ========================================================= */}

      <div className="flex min-w-0 items-center gap-3">
        {/* ======================================================= */}
        {/* MOBILE SIDEBAR TOGGLE                                   */}
        {/* ======================================================= */}

        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={
            sidebarExpanded
              ? "Collapse navigation"
              : "Expand navigation"
          }
          aria-expanded={sidebarExpanded}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-lg

            text-slate-400

            transition-colors
            duration-150

            hover:bg-slate-800/60
            hover:text-slate-100

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500/40

            md:hidden
          "
        >
          {sidebarExpanded ? (
            <X
              size={20}
              strokeWidth={1.8}
            />
          ) : (
            <Menu
              size={20}
              strokeWidth={1.8}
            />
          )}
        </button>

        {/* ======================================================= */}
        {/* WORKBENCH CONTEXT                                       */}
        {/* ======================================================= */}

        <div className="min-w-0">
          <h2
            className="
              truncate

              text-base
              font-semibold
              leading-5
              tracking-tight

              text-slate-100

              sm:text-lg
              sm:leading-6
            "
          >
            Data Engineering Workbench
          </h2>

          <p
            className="
              mt-0.5

              truncate

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
          shrink-0
          items-center
          gap-2.5

          py-1.5
          pl-2

          transition-all
          duration-200

          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500/30
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
      </Link>
    </header>
  );
}