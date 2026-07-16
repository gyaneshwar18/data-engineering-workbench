import { UserRound } from "lucide-react";

export default function AboutSection() {
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
            border-blue-500/20
            bg-blue-500/10
          "
        >
          <UserRound
            size={20}
            className="text-blue-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            About
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Professional summary
          </p>

        </div>

      </div>

      {/* Content */}

      <div className="mt-6">

        <p className="text-[15px] leading-8 text-slate-300">

          Data Engineer focused on designing scalable data
          platforms, building modern ETL pipelines, developing
          SQL-driven analytics solutions, and implementing
          end-to-end data engineering workflows. Currently
          expanding expertise across PySpark, Delta Lake,
          Azure Data Factory, Azure Databricks, Azure Synapse,
          Apache Airflow, Kafka, and production-ready Modern
          Data Stack architectures through continuous hands-on
          projects and real-world engineering practices.

        </p>

      </div>

    </section>
  );
}