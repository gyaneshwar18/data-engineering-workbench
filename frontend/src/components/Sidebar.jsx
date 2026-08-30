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

export default function Sidebar() {
  return (
    <aside
      className="
        flex
        h-screen
        w-[248px]
        shrink-0
        flex-col

        border-r
        border-slate-800/80

        bg-slate-950

        text-slate-200
      "
    >
      {/* ========================================================= */}
      {/* BRAND                                                     */}
      {/* ========================================================= */}

      <div className="px-6 pb-7 pt-7">
        <div className="flex items-center gap-3">
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

          <div className="min-w-0">
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
      {/* NAVIGATION                                                 */}
      {/* ========================================================= */}

      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {navigation.map(
            ({ name, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
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
                    "transition-all",
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

                    <span>{name}</span>
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

      <div className="px-5 pb-5">
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