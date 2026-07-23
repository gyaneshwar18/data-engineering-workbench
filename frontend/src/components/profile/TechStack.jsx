import {
  Layers3,
  Code2,
  Database,
  Cloud,
  Workflow,
  GitBranch,
  BarChart3,
  MonitorCog,
  Boxes,
} from "lucide-react";

const techCategories = [
  {
    title: "Programming",
    icon: Code2,
    technologies: ["Python", "SQL", "JavaScript"],
  },
  {
    title: "Data Engineering",
    icon: Workflow,
    technologies: [
      "ETL",
      "Apache Airflow",
      "PySpark",
      "Delta Lake",
      "Kafka",
    ],
  },
  {
    title: "Cloud",
    icon: Cloud,
    technologies: [
      "Azure Data Factory",
      "Azure Data Lake",
      "Azure Databricks",
      "Azure Synapse",
      "Azure SQL",
      "Azure DevOps",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    technologies: ["PostgreSQL", "MySQL"],
  },
  {
    title: "Backend",
    icon: Boxes,
    technologies: ["FastAPI", "REST API"],
  },
  {
    title: "Frontend",
    icon: MonitorCog,
    technologies: ["React", "Tailwind CSS", "Vite"],
  },
  {
    title: "Version Control",
    icon: GitBranch,
    technologies: ["Git", "GitHub"],
  },
  {
    title: "Visualization",
    icon: BarChart3,
    technologies: ["Power BI", "Recharts"],
  },
];

export default function TechStack() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-700/50
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        p-6
      "
    >
      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="flex items-center gap-4">

          <div
            className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-violet-500/20
                    bg-violet-500/10
                    shadow-[0_0_15px_rgba(139,92,246,0.12)]
                  "
          >
            <Layers3
              size={20}
              className="text-violet-400"
            />
          </div>

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Tech Stack
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Technologies used across modern data engineering workflows
            </p>

          </div>

        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-gradient-to-r from-cyan-500/10 via-slate-700 to-transparent" />

        {/* Categories */}

        <div className="grid gap-6 md:grid-cols-2">

          {techCategories.map((category) => {

            const Icon = category.icon;

            return (

              <div
                key={category.title}
                className="
                  rounded-2xl
                  border
                  border-slate-700/50
                  bg-slate-800/25
                  p-5
                  transition-all
                  duration-300
                  hover:border-cyan-500/30
                  hover:bg-slate-800/35
                  hover:shadow-[0_10px_25px_rgba(0,0,0,0.22)]
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-cyan-500/10
                        shadow-[0_0_12px_rgba(6,182,212,0.08)]
                      "
                    >
                      <Icon
                        size={18}
                        className="text-cyan-400"
                      />
                    </div>

                    <h3 className="text-[15px] font-semibold text-white">
                      {category.title}
                    </h3>

                  </div>

                  <span
                    className="
                      rounded-full
                      border
                      border-slate-600
                      bg-slate-800/80
                      px-2.5
                      py-1
                      text-[11px]
                      font-medium
                      text-slate-400
                    "
                  >
                    {category.technologies.length}
                  </span>

                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (

                    <span
                      key={tech}
                      className="
                        rounded-full
                        border
                        border-slate-600/80
                        bg-slate-800/70
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-slate-300
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-cyan-500/30
                        hover:bg-slate-700/80
                        hover:text-white
                        hover:shadow-[0_0_12px_rgba(6,182,212,0.08)]
                      "
                    >
                      {tech}
                    </span>

                  ))}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}