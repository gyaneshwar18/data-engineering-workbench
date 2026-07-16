import {
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
    technologies: [
      "Python",
      "SQL",
      "JavaScript",
    ],
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
    technologies: [
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    title: "Backend",
    icon: Boxes,
    technologies: [
      "FastAPI",
      "REST API",
    ],
  },
  {
    title: "Frontend",
    icon: MonitorCog,
    technologies: [
      "React",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    title: "Version Control",
    icon: GitBranch,
    technologies: [
      "Git",
      "GitHub",
    ],
  },
  {
    title: "Visualization",
    icon: BarChart3,
    technologies: [
      "Power BI",
      "Recharts",
    ],
  },
];

export default function TechStack() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-6
        shadow-sm
      "
    >
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
            border-cyan-500/20
            bg-cyan-500/10
          "
        >
          <Code2
            size={20}
            className="text-cyan-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            Tech Stack
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Technologies used across modern data engineering workflows
          </p>

        </div>

      </div>

      {/* Categories */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {techCategories.map((category) => {

          const Icon = category.icon;

          return (

            <div
              key={category.title}
              className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-950/60
                p-5
                transition-all
                duration-200
                hover:border-cyan-500/30
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                  "
                >
                  <Icon
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <h3 className="font-semibold text-white">
                  {category.title}
                </h3>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {category.technologies.map((tech) => (

                  <span
                    key={tech}
                    className="
                      rounded-full
                      border
                      border-slate-700
                      bg-slate-800
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-slate-300
                      transition-all
                      duration-200
                      hover:border-cyan-500/40
                      hover:text-white
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

    </section>
  );
}