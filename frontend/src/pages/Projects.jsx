import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "Data Engineering Workbench",
    problem:
      "A full-stack platform for writing SQL, managing datasets, visualizing results, and orchestrating modern data engineering workflows.",
    tech: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
    ],
    status: "Production",
  },
  {
    title: "End-to-End Data Pipeline",
    problem:
      "Designed an automated ETL pipeline that extracts, transforms, and loads business data into a PostgreSQL warehouse for analytics.",
    tech: [
      "Python",
      "Airflow",
      "PostgreSQL",
      "Pandas",
      "Docker",
    ],
    status: "Production",
  },
  {
    title: "Lakehouse Analytics Platform",
    problem:
      "Built a scalable analytics workflow using Spark and Delta Lake to process large datasets with optimized performance.",
    tech: [
      "PySpark",
      "Delta Lake",
      "Parquet",
      "SQL",
      "Databricks",
    ],
    status: "Development",
  },
  {
    title: "Azure Data Platform",
    problem:
      "Cloud-based data engineering solution using Azure services for secure storage, processing, orchestration, and reporting.",
    tech: [
      "Azure",
      "Data Factory",
      "Synapse",
      "Data Lake",
      "Power BI",
    ],
    status: "Development",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Portfolio
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
            Selected Projects
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            A selection of projects showcasing modern data engineering,
            cloud platforms, distributed processing, and scalable
            analytics solutions.
          </p>
        </motion.div>

        {/* Project Grid */}

        <div className="grid gap-6 lg:grid-cols-2">
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
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}