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

export default function Sidebar({
  expanded = false,
  onToggle,
  onNavigate,
}) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        aria-hidden="true"
        onClick={onToggle}
        className={`
          fixed
          inset-0
          z-40
          bg-slate-950/55
          backdrop-blur-[2px]

          transition-opacity
          duration-200

          lg:hidden

          ${
            expanded
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50

          flex
          h-screen
          w-[min(82vw,280px)]
          shrink-0
          flex-col

          border-r
          border-slate-800/80

          bg-slate-950

          text-slate-200

          shadow-2xl
          shadow-black/30

          transition-transform
          duration-200
          ease-out

          ${
            expanded
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:relative
          lg:inset-auto
          lg:z-auto
          lg:w-[248px]
          lg:translate-x-0
          lg:shadow-none
        `}
      >
        {/* Sidebar header */}
        <div
          className="
            flex
            shrink-0
            items-center

            px-5
            pb-7
            pt-7

            lg:px-6
          "
        >
          {/* Brand */}
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

          {/* Brand text */}
          <div className="ml-3 min-w-0">
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
                truncate
                text-xs
                font-medium
                text-slate-500
              "
            >
              Data Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-3
          "
          aria-label="Workbench navigation"
        >
          <div className="space-y-1">
            {navigation.map(
              ({ name, to, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    [
                      "group",
                      "relative",
                      "flex",
                      "h-11",
                      "w-full",
                      "items-center",
                      "gap-3",
                      "rounded-lg",
                      "px-3",
                      "text-sm",
                      "font-medium",
                      "transition-colors",
                      "duration-150",

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

                      {/* Navigation icon */}
                      <Icon
                        size={18}
                        strokeWidth={
                          isActive ? 2.1 : 1.8
                        }
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

                      {/* Navigation label */}
                      <span className="truncate">
                        {name}
                      </span>
                    </>
                  )}
                </NavLink>
              )
            )}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div
          className="
            shrink-0
            px-5
            pb-5
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
    </>
  );
}