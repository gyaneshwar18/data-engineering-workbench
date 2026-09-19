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

        p-4
        sm:p-6
      "
    >
      {/* ===================================================== */}
      {/* BACKGROUND GLOW                                      */}
      {/* ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-cyan-500/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-16
          bottom-0
          h-32
          w-32
          rounded-full
          bg-blue-500/5
          blur-3xl
        "
      />

      <div className="relative">

        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3

            sm:gap-4
          "
        >

          {/* Icon */}

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
              border-cyan-500/20

              bg-cyan-500/10

              shadow-[0_0_15px_rgba(6,182,212,0.08)]

              sm:h-11
              sm:w-11
            "
          >
            <UserRound
              size={19}
              className="text-cyan-400 sm:h-5 sm:w-5"
            />
          </div>

          {/* Title */}

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
              About
            </h2>

            <p
              className="
                mt-0.5
                text-xs
                text-slate-400

                sm:mt-1
                sm:text-sm
              "
            >
              Professional summary
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* DIVIDER                                           */}
        {/* ================================================= */}

        <div
          className="
            my-4
            h-px

            bg-gradient-to-r
            from-cyan-500/10
            via-slate-700
            to-transparent

            sm:my-5
          "
        />

        {/* ================================================= */}
        {/* CONTENT                                           */}
        {/* ================================================= */}

        <div
          className="
            rounded-xl

            border
            border-slate-700/40

            bg-slate-800/25

            px-4
            py-4

            sm:rounded-2xl
            sm:px-5
            sm:py-5
          "
        >

          <p
            className="
              text-[14px]
              leading-7
              text-slate-300

              sm:text-[15px]
              sm:leading-8
            "
          >

            <span className="font-semibold text-cyan-300">
              Data Engineer
            </span>{" "}
            focused on designing scalable data platforms,
            building modern ETL pipelines, developing
            <span className="text-white">
              {" "}
              SQL-driven analytics solutions
            </span>
            , and implementing end-to-end data engineering
            workflows.

            Currently expanding expertise across
            <span className="text-cyan-300">
              {" "}
              PySpark, Delta Lake, Azure Data Factory,
              Azure Databricks, Azure Synapse,
              Apache Airflow, Kafka
            </span>
            , and production-ready Modern Data Stack
            architectures through continuous hands-on projects
            and real-world engineering practices.

          </p>

        </div>

      </div>
    </section>
  );
}