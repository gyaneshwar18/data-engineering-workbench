import { UserRound } from "lucide-react";

export default function AboutSection() {
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

      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl" />

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
              border-cyan-500/20
              bg-cyan-500/10
              shadow-[0_0_15px_rgba(6,182,212,0.08)]
            "
          >
            <UserRound
              size={20}
              className="text-cyan-400"
            />
          </div>

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              About
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Professional summary
            </p>

          </div>

        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-gradient-to-r from-cyan-500/10 via-slate-700 to-transparent" />

        {/* Content */}

        <div
          className="
            rounded-2xl
            border
            border-slate-700/40
            bg-slate-800/25
            px-5
            py-5
          "
        >
          <p className="text-[15px] leading-8 text-slate-300">

            <span className="font-semibold text-cyan-300">
              Data Engineer
            </span>{" "}
            focused on designing scalable data platforms,
            building modern ETL pipelines, developing
            <span className="text-white"> SQL-driven analytics solutions</span>,
            and implementing end-to-end data engineering workflows.
            Currently expanding expertise across
            <span className="text-cyan-300">
              {" "}
              PySpark, Delta Lake, Azure Data Factory,
              Azure Databricks, Azure Synapse,
              Apache Airflow, Kafka
            </span>
            , and production-ready Modern Data Stack architectures
            through continuous hands-on projects and real-world
            engineering practices.

          </p>
        </div>

      </div>
    </section>
  );
}