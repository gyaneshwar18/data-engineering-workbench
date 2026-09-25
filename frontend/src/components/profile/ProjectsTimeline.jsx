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
      "Built a full-stack data engineering platform for data ingestion, ETL workflows, SQL analysis, dataset management, pipeline operations, and analytics. Developed modular Dashboard, Pipelines, SQL Lab, Datasets, and Metrics functionality with FastAPI and PostgreSQL.",
    tech: [
      "Python",
      "SQL",
      "PostgreSQL",
      "FastAPI",
      "React",
      "Pandas",
    ],
    status: "Active",
    github:
      "https://github.com/gyaneshwar18/data-engineering-workbench",
  },

  {
    year: "2026",
    title: "End-to-End ETL Data Pipeline",
    description:
      "Built a batch ETL pipeline to extract, validate, transform, and load data into PostgreSQL. Implemented SQL-based transformations, data quality checks, incremental loading using timestamps, and reliable batch processing workflows.",
    tech: [
      "Python",
      "SQL",
      "PostgreSQL",
      "ETL",
      "Data Quality",
      "Incremental Loading",
    ],
    status: "Completed",
    github:
      "https://github.com/gyaneshwar18/Data-Engineer-Journey",
  },

  {
    year: "2026",
    title: "Data Engineering Journey",
    description:
      "Hands-on engineering journey covering SQL, Python ETL, Airflow, PySpark, Delta Lake, Azure data services, and production-oriented data engineering practices through structured projects and implementation exercises.",
    tech: [
      "Python",
      "SQL",
      "Airflow",
      "PySpark",
      "Delta Lake",
      "Azure",
    ],
    status: "Ongoing",
    github:
      "https://github.com/gyaneshwar18/Data-Engineer-Journey",
  },
];

export default function ProjectsTimeline() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-4
        sm:p-6
        shadow-sm
      "
    >
      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <div className="relative flex items-center gap-3 sm:gap-4">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-xl

            border
            border-indigo-500/20

            bg-indigo-500/10
          "
        >
          <FolderGit2
            size={19}
            className="text-indigo-400"
          />
        </div>

        <div className="min-w-0">

          <h2
            className="
              text-lg
              font-semibold
              tracking-tight
              text-white

              sm:text-xl
            "
          >
            Projects
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-400

              sm:text-sm
            "
          >
            Data engineering projects and continuous development journey
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* TIMELINE                                          */}
      {/* ================================================= */}

      <div className="mt-7 space-y-6 sm:mt-8 sm:space-y-8">

        {projects.map((project, index) => (

          <div
            key={project.title}
            className="
              relative

              pl-8
              sm:pl-10
            "
          >

            {/* =========================================== */}
            {/* TIMELINE LINE                               */}
            {/* =========================================== */}

            {index !== projects.length - 1 && (
              <div
                className="
                  absolute
                  left-[11px]
                  top-8
                  bottom-[-24px]

                  w-px

                  bg-gradient-to-b
                  from-indigo-500/40
                  via-slate-700
                  to-slate-800

                  sm:left-[13px]
                  sm:bottom-[-32px]
                "
              />
            )}

            {/* =========================================== */}
            {/* TIMELINE DOT                                */}
            {/* =========================================== */}

            <div
              className="
                absolute
                left-0
                top-1

                flex
                h-6
                w-6
                items-center
                justify-center

                rounded-full

                border
                border-indigo-500/30

                bg-indigo-500/10

                shadow-[0_0_12px_rgba(99,102,241,0.12)]

                sm:h-7
                sm:w-7
              "
            >
              <div
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-indigo-400

                  sm:h-2.5
                  sm:w-2.5
                "
              />
            </div>

            {/* =========================================== */}
            {/* PROJECT CARD                                */}
            {/* =========================================== */}

            <div
              className="
                rounded-2xl

                border
                border-slate-800

                bg-slate-950/60

                p-4

                transition-all
                duration-200

                hover:border-indigo-500/30
                hover:bg-slate-950/80

                sm:p-5
              "
            >

              {/* ========================================= */}
              {/* TITLE + STATUS                            */}
              {/* ========================================= */}

              <div
                className="
                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                "
              >

                <div className="min-w-0">

                  <h3
                    className="
                      text-base
                      font-semibold
                      leading-6
                      text-white

                      sm:text-lg
                    "
                  >
                    {project.title}
                  </h3>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2

                      text-xs
                      text-slate-500

                      sm:text-sm
                    "
                  >
                    <CalendarDays
                      size={14}
                      className="shrink-0 text-indigo-400"
                    />

                    {project.year}
                  </div>

                </div>

                {/* Status */}

                <div
                  className={`
                    inline-flex
                    w-fit
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium

                    sm:px-3
                    sm:text-xs

                    ${
                      project.status === "Completed"
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : project.status === "Active"
                        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                        : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                    }
                  `}
                >
                  {project.status === "Completed" ? (
                    <CheckCircle2 size={12} />
                  ) : (
                    <Clock3 size={12} />
                  )}

                  {project.status}
                </div>

              </div>

              {/* ========================================= */}
              {/* DESCRIPTION                               */}
              {/* ========================================= */}

              <p
                className="
                  mt-4

                  text-[13px]
                  leading-6
                  text-slate-300

                  sm:mt-5
                  sm:text-[15px]
                  sm:leading-7
                "
              >
                {project.description}
              </p>

              {/* ========================================= */}
              {/* TECHNOLOGIES                              */}
              {/* ========================================= */}

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-1.5

                  sm:mt-5
                  sm:gap-2
                "
              >
                {project.tech.map((tech) => (

                  <span
                    key={tech}
                    className="
                      rounded-full

                      border
                      border-slate-700

                      bg-slate-800/70

                      px-2.5
                      py-1

                      text-[10px]
                      font-medium
                      text-slate-300

                      sm:px-3
                      sm:text-xs
                    "
                  >
                    {tech}
                  </span>

                ))}
              </div>

              {/* ========================================= */}
              {/* REPOSITORY                                */}
              {/* ========================================= */}

              <div className="mt-5">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-1.5

                    text-xs
                    font-medium
                    text-indigo-400

                    transition-colors
                    hover:text-indigo-300

                    sm:text-sm
                  "
                >
                  View Repository

                  <ExternalLink size={14} />

                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}