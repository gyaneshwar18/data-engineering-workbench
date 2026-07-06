import {
  FolderKanban,
  Workflow,
  Database,
} from "lucide-react";

const stats = [
  {
    icon: FolderKanban,
    label: "Projects",
    value: "18",
    color: "text-blue-400",
  },
  {
    icon: Workflow,
    label: "Pipelines",
    value: "8",
    color: "text-emerald-400",
  },
  {
    icon: Database,
    label: "SQL Queries",
    value: "142",
    color: "text-violet-400",
  },
];

export default function ProfileStats() {
  return (
    <div className="space-y-3">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
              flex
              items-center
              justify-between

              rounded-xl

              border
              border-slate-800

              bg-slate-800/40

              px-4
              py-3

              hover:border-slate-700
              transition-all
            "
          >

            <div className="flex items-center gap-3">

              <Icon
                size={18}
                className={item.color}
              />

              <span className="text-slate-300">
                {item.label}
              </span>

            </div>

            <span className="text-white font-semibold">
              {item.value}
            </span>

          </div>
        );
      })}

    </div>
  );
}