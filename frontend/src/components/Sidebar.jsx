import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Database,
  Workflow,
  Table,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    to: "/workbench",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Projects",
    to: "/workbench/projects",
    icon: FolderKanban,
  },
  {
    name: "SQL Lab",
    to: "/workbench/sql-lab",
    icon: Database,
  },
  {
    name: "Pipelines",
    to: "/workbench/pipelines",
    icon: Workflow,
  },
  {
    name: "Datasets",
    to: "/workbench/datasets",
    icon: Table,
  },
];

export default function Sidebar({ mobileOpen = false, onNavigate }) {
  return (
    <aside
      className={`
        flex
        h-screen
        shrink-0
        flex-col

        border-r
        border-slate-800/80

        bg-slate-950

        text-slate-200

        transition-[width]
        duration-200
        ease-out

        w-[58px]
        ${mobileOpen ? "sm:w-[58px]" : ""}

        md:w-[248px]
      `}
    >
      {/* ========================================================= */}
      {/* BRAND                                                     */}
      {/* ========================================================= */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-center

          px-2
          pb-7
          pt-7

          md:justify-start
          md:px-6
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          {/* Brand mark */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center

              rounded-lg

              border
              border-blue-500/20

              bg-blue-500/10

              text-xs
              font-bold
              tracking-tight
              text-blue-400
            "
          >
            DE
          </div>

          {/* Brand text — desktop only */}

          <div className="hidden min-w-0 md:block">
            <h1
              className="
                truncate
                text-[17px]
                font-semibold
                tracking-tight
                text-white
              "
            >
              DE Workbench
            </h1>

            <p
              className="
                mt-0.5
                text-xs
                font-medium
                text-slate-500
              "
            >
              Data Platform
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* NAVIGATION                                                */}
      {/* ========================================================= */}

      <nav
        aria-label="Workbench navigation"
        className="
          flex-1
          px-2
          md:px-3
        "
      >
        <div className="space-y-1">
          {navigation.map(
            ({ name, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onNavigate}
                title={name}
                aria-label={name}
                className={({ isActive }) =>
                  [
                    "group",
                    "relative",
                    "flex",
                    "h-11",
                    "w-full",
                    "items-center",
                    "justify-center",
                    "gap-3",
                    "rounded-lg",
                    "px-2",
                    "text-sm",
                    "font-medium",
                    "transition-all",
                    "duration-150",

                    "md:justify-start",
                    "md:px-3",

                    isActive
                      ? [
                          "bg-blue-500/10",
                          "text-blue-300",
                        ].join(" ")
                      : [
                          "text-slate-400",
                          "hover:bg-slate-800/60",
                          "hover:text-slate-200",
                        ].join(" "),
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}

                    {isActive && (
                      <span
                        className="
                          absolute
                          left-0
                          top-1/2

                          h-5
                          w-0.5

                          -translate-y-1/2

                          rounded-full

                          bg-blue-400
                        "
                      />
                    )}

                    {/* Route icon */}

                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.1 : 1.8}
                      className={`
                        shrink-0

                        transition-colors
                        duration-150

                        ${
                          isActive
                            ? "text-blue-400"
                            : "text-slate-500 group-hover:text-slate-300"
                        }
                      `}
                    />

                    {/* Route name — desktop only */}

                    <span className="hidden md:block">
                      {name}
                    </span>

                    {/* Mobile tooltip */}

                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-full
                        z-50
                        ml-2

                        hidden
                        whitespace-nowrap

                        rounded-md
                        border
                        border-slate-700/80

                        bg-slate-800

                        px-2.5
                        py-1.5

                        text-xs
                        font-medium
                        text-slate-100

                        shadow-lg
                        shadow-black/30

                        opacity-0

                        transition-opacity
                        duration-150

                        group-hover:opacity-100

                        md:hidden
                      "
                    >
                      {name}
                    </span>
                  </>
                )}
              </NavLink>
            )
          )}
        </div>
      </nav>

      {/* ========================================================= */}
      {/* FOOTER                                                     */}
      {/* ========================================================= */}

      <div
        className="
          hidden
          px-5
          pb-5

          md:block
        "
      >
        <div
          className="
            border-t
            border-slate-800/70

            pt-4
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-slate-600
            "
          >
            Workbench
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            v2.0
          </p>
        </div>
      </div>
    </aside>
  );
}