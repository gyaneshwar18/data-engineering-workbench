import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "Data Engineering Workbench",
    problem:
      "Full-stack platform for SQL development, pipeline orchestration, analytics, and dataset management in a unified workspace.",
    tech: ["React", "FastAPI", "PostgreSQL", "Docker"],
    status: "Completed",
  },
  {
    title: "End-to-End Data Pipeline",
    problem:
      "Automated ETL pipeline built with Apache Airflow for extracting, transforming, and loading data into PostgreSQL.",
    tech: ["Python", "Airflow", "PostgreSQL", "Pandas"],
    status: "Completed",
  },
  {
    title: "Lakehouse Analytics Platform",
    problem:
      "Scalable analytics platform using PySpark and Delta Lake for efficient big data processing and optimization.",
    tech: ["PySpark", "Delta Lake", "Parquet", "SQL"],
    status: "In Progress",
  },
  {
    title: "Azure Data Platform",
    problem:
      "Cloud-native data engineering solution using Azure services for ingestion, storage, orchestration, and analytics.",
    tech: ["Azure", "Data Factory", "Synapse", "Data Lake"],
    status: "In Progress",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        py-8

        sm:py-10
        lg:py-12
      "
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-20
            h-56
            w-56
            -translate-x-1/2
            rounded-full
            bg-cyan-500/5
            blur-[100px]

            sm:h-72
            sm:w-72
            sm:blur-[120px]
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4

          sm:px-5
          md:px-6
          lg:px-8
        "
      >
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-cyan-400

              sm:text-xs
              sm:tracking-[0.25em]
            "
          >
            Portfolio
          </span>

          <h2
            className="
    text-2xl
    font-semibold
    tracking-tight
    text-white
  "
          >
            Featured Engineering Projects
          </h2>

          <p
            className="
    mt-1
    text-sm
    text-slate-400
  "
          >
           Scalable data solutions for modern analytics.
          </p>
        </motion.div>

        {/* Grid */}

        <div
          className="
            grid
            min-w-0
            items-stretch
            gap-4

            sm:gap-5

            lg:grid-cols-2
            lg:gap-6
          "
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.12,
              }}
              className="min-w-0"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}