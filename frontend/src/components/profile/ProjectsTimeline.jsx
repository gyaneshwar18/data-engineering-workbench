import {
  FolderGit2,
  CalendarDays,
  ExternalLink,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const projects = [
  {
    year: "2026",
    title: "Data Engineering Workbench",
    description:
      "Enterprise-inspired data engineering platform featuring Dashboard, SQL Lab, Pipelines, Datasets, GitHub integration, analytics and monitoring.",
    tech: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Tailwind CSS",
      "Chart.js",
    ],
    status: "Active",
    github: "https://github.com/gyaneshwar18/data-engineering-workbench",
  },
  {
    year: "2026",
    title: "90-Day Data Engineering Journey",
    description:
      "Hands-on learning repository covering SQL, ETL, Airflow, PySpark, Delta Lake, Azure ecosystem and production-ready data engineering concepts.",
    tech: [
      "Python",
      "SQL",
      "Airflow",
      "PySpark",
      "Delta Lake",
      "Azure",
    ],
    status: "Ongoing",
    github: "https://github.com/gyaneshwar18",
  },
  {
    year: "2025",
    title: "WeatherNow",
    description:
      "Responsive weather dashboard consuming REST APIs with clean UI and reusable React components.",
    tech: [
      "React",
      "REST API",
      "JavaScript",
    ],
    status: "Completed",
    github: "https://github.com/gyaneshwar18",
  },
];

export default function ProjectsTimeline() {
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
            border-indigo-500/20
            bg-indigo-500/10
          "
        >
          <FolderGit2
            size={20}
            className="text-indigo-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            Projects Timeline
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Engineering projects and continuous development journey
          </p>

        </div>

      </div>

      {/* Timeline */}

      <div className="mt-8 space-y-8">

        {projects.map((project, index) => (

          <div
            key={project.title}
            className="relative pl-10"
          >

            {index !== projects.length - 1 && (

              <div
                className="
                  absolute
                  left-[13px]
                  top-8
                  h-full
                  w-px
                  bg-slate-700
                "
              />

            )}

            <div
              className="
                absolute
                left-0
                top-1
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-indigo-500/30
                bg-indigo-500/10
              "
            >
              <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            </div>

            <div
              className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-950/60
                p-5
                transition-all
                duration-200
                hover:border-indigo-500/30
              "
            >

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">

                    <CalendarDays size={15} />

                    {project.year}

                  </div>

                </div>

                <div
                  className={`
                    flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
                    ${
                      project.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : project.status === "Active"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }
                  `}
                >
                  {project.status === "Completed" ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Clock3 size={14} />
                  )}

                  {project.status}
                </div>

              </div>

              <p className="mt-5 text-[15px] leading-7 text-slate-300">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {project.tech.map((tech) => (

                  <span
                    key={tech}
                    className="
                      rounded-full
                      border
                      border-slate-700
                      bg-slate-800
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-slate-300
                    "
                  >
                    {tech}
                  </span>

                ))}

              </div>

              <div className="mt-6">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-blue-400
                    transition-colors
                    hover:text-blue-300
                  "
                >
                  View Repository

                  <ExternalLink size={16} />

                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}