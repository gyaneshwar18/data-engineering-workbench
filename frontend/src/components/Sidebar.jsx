import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Database,
  Workflow,
  Table,
  Menu,
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

        ${expanded ? "w-[200px]" : "w-[60px]"}

        lg:w-[248px]
      `}
    >
      {/* Sidebar header */}
      <div
        className={`
          shrink-0

          pt-5
          pb-5

          lg:px-6
          lg:pb-7
          lg:pt-7

          ${
            expanded
              ? "px-3"
              : "flex flex-col items-center px-2"
          }
        `}
      >
        <div
          className={`
            flex
            items-center

            ${
              expanded
                ? "justify-between"
                : "flex-col gap-3"
            }

            lg:justify-start
            lg:gap-3
          `}
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
          <div
            className={`
              min-w-0
              overflow-hidden

              transition-all
              duration-200

              lg:ml-0
              lg:max-w-[160px]
              lg:opacity-100

              ${
                expanded
                  ? "ml-3 max-w-[145px] opacity-100"
                  : "ml-0 max-w-0 opacity-0"
              }
            `}
          >
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

          {/* Sidebar toggle */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={
              expanded
                ? "Collapse navigation"
                : "Expand navigation"
            }
            aria-expanded={expanded}
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center

              rounded-lg

              border
              border-slate-800

              text-slate-500

              transition-all
              duration-150

              hover:border-slate-700
              hover:bg-slate-800/60
              hover:text-slate-200

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/30

              lg:hidden

              ${
                expanded
                  ? "ml-2"
                  : ""
              }
            `}
          >
            <Menu
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`
          min-h-0
          flex-1

          ${
            expanded
              ? "px-3"
              : "px-2"
          }

          lg:px-3
        `}
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
                title={!expanded ? name : undefined}
                className={({ isActive }) =>
                  [
                    "group",
                    "relative",
                    "flex",
                    "h-11",
                    "w-full",
                    "items-center",
                    "rounded-lg",
                    "text-sm",
                    "font-medium",
                    "transition-colors",
                    "duration-150",

                    expanded
                      ? "gap-3 px-3"
                      : "justify-center px-2",

                    "lg:justify-start",
                    "lg:gap-3",
                    "lg:px-3",

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
                    <span
                      className={`
                        min-w-0
                        truncate
                        whitespace-nowrap

                        transition-all
                        duration-200

                        lg:block

                        ${
                          expanded
                            ? "max-w-[130px] opacity-100"
                            : "max-w-0 opacity-0"
                        }
                      `}
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

      {/* Sidebar footer */}
      <div
        className={`
          shrink-0
          pb-5

          transition-all
          duration-200

          ${
            expanded
              ? "px-4"
              : "px-2"
          }

          lg:px-5
        `}
      >
        <div
          className="
            border-t
            border-slate-800/70
            pt-4
          "
        >
          <p
            className={`
              overflow-hidden

              text-[10px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-slate-600

              transition-all
              duration-200

              lg:max-w-full
              lg:opacity-100

              ${
                expanded
                  ? "max-w-full opacity-100"
                  : "max-w-0 opacity-0"
              }
            `}
          >
            Workbench
          </p>

          <p
            className={`
              mt-1
              overflow-hidden

              text-xs
              text-slate-500

              transition-all
              duration-200

              lg:max-w-full
              lg:opacity-100

              ${
                expanded
                  ? "max-w-full opacity-100"
                  : "max-w-0 opacity-0"
              }
            `}
          >
            v2.0
          </p>
        </div>
      </div>
    </aside>
  );
}