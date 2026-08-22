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
      description: "Import CSV files",
      icon: Upload,
      color: "cyan",
      onClick: onUpload,
    },
    {
      title: "Table Explorer",
      description: "Browse database schema",
      icon: Table2,
      color: "emerald",
      onClick: onTableExplorer,
    },
    {
      title: "Query History",
      description: "Previously executed SQL",
      icon: History,
      color: "amber",
      onClick: onHistory,
    },
    {
      title: "Saved Queries",
      description: "Reusable SQL snippets",
      icon: Bookmark,
      color: "violet",
      onClick: onSavedQueries,
    },
  ];

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-700/60
        bg-slate-900
        shadow-xl
      "
    >
      {/* Header */}
      <div
        className="
          border-b
          border-slate-700/60
          bg-slate-800/40
          px-6
          py-4
        "
      >
        <h2 className="text-sm font-semibold text-white">
          Workspace Tools
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Manage datasets, inspect tables and access your SQL workspace.
        </p>
      </div>

      {/* Workspace Cards */}
      <div
        className="
          grid
          gap-4
          p-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {workspaceItems.map((item) => (
          <WorkspaceCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            color={item.color}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceToolbar;