import { Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Topbar({
  sidebarExpanded = false,
  onMenuToggle,
}) {
  return (
    <header
      className="
        relative
        z-[100]
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
      {/* ================================================= */}
      {/* LEFT SIDE                                        */}
      {/* ================================================= */}

      <div className="flex min-w-0 flex-1 items-center">

        {/* Mobile / tablet navigation toggle */}

        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={
            sidebarExpanded
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={sidebarExpanded}
          className="
            mr-3
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-lg

            border
            border-slate-800

            text-slate-400

            transition-colors
            duration-150

            hover:border-slate-700
            hover:bg-slate-800/60
            hover:text-slate-200

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/30

            lg:hidden
          "
        >
          <Menu
            size={19}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>

        {/* Application identity */}

        <div className="min-w-0">
          <h2
            className="
              truncate
              text-base
              font-semibold
              leading-6
              tracking-tight
              text-slate-100

              sm:text-lg
            "
          >
            Data Foundry
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
            Data Engineering Platform
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* PROFILE DROPDOWN — RIGHT SIDE                    */}
      {/* ================================================= */}

      <div className="ml-3 shrink-0 sm:ml-4">
        <ProfileDropdown />
      </div>
    </header>
  );
}