import {
  Upload,
  Table2,
  History,
  Bookmark,
} from "lucide-react";

import WorkspaceCard from "../cards/WorkspaceCard";

const WorkspaceToolbar = ({
  onUpload = () => {},
  onTableExplorer = () => {},
  onHistory = () => {},
  onSavedQueries = () => {},
}) => {
  const workspaceItems = [
    {
      title: "Upload Dataset",
      mobileTitle: "Upload",
      description: "Import CSV files",
      mobileDescription: "CSV files",
      icon: Upload,
      color: "cyan",
      onClick: onUpload,
    },
    {
      title: "Table Explorer",
      mobileTitle: "Explorer",
      description: "Browse database schema",
      mobileDescription: "Database schema",
      icon: Table2,
      color: "emerald",
      onClick: onTableExplorer,
    },
    {
      title: "Query History",
      mobileTitle: "History",
      description: "Previously executed SQL",
      mobileDescription: "SQL runs",
      icon: History,
      color: "amber",
      onClick: onHistory,
    },
    {
      title: "Saved Queries",
      mobileTitle: "Saved",
      description: "Reusable SQL snippets",
      mobileDescription: "Saved queries",
      icon: Bookmark,
      color: "violet",
      onClick: onSavedQueries,
    },
  ];

  return (
    <div
      className="
        min-w-0
        w-full
        overflow-hidden

        rounded-xl
        border
        border-slate-700/60

        bg-slate-900
        shadow-xl

        sm:rounded-2xl
      "
    >
      {/* ================================================== */}
      {/* HEADER                                             */}
      {/* ================================================== */}

      <div
        className="
          border-b
          border-slate-700/60
          bg-slate-800/40

          px-3.5
          py-3

          sm:px-6
          sm:py-4
        "
      >
        <h2
          className="
            text-xs
            font-semibold
            text-white

            sm:text-sm
          "
        >
          Workspace Tools
        </h2>

        <p
          className="
            mt-0.5
            truncate
            text-[10px]
            text-slate-400

            sm:mt-1
            sm:text-sm
          "
        >
          Manage datasets, inspect tables and access your SQL workspace.
        </p>
      </div>

      {/* ================================================== */}
      {/* WORKSPACE ACTIONS                                  */}
      {/* ================================================== */}

      <div
        className="
          grid
          min-w-0
          grid-cols-2
          gap-2.5
          p-3

          sm:gap-4
          sm:p-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {workspaceItems.map((item) => (
          <div
            key={item.title}
            className="min-w-0"
          >
            <WorkspaceCard
              title={item.mobileTitle}
              description={item.mobileDescription}
              icon={item.icon}
              color={item.color}
              onClick={item.onClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceToolbar;