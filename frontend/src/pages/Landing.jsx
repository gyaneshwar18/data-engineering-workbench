import { Link } from "react-router-dom";

export default function Landing() {
  const skills = [
    "Python",
    "SQL",
    "PostgreSQL",
    "PySpark",
    "Databricks",
    "ADF",
  ];

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#050B14]
      "
    >
      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-[url('/images/data-bg-mobile.png')]
          bg-cover
          bg-center
          bg-no-repeat

          md:bg-[url('/images/data-bg-desktop6.png')]
        "
      />

      {/* Subtle overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/10
        "
      />

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center

          px-4
          sm:px-6
        "
      >
        <div
          className="
            relative
            flex
            w-[62%]
            max-w-[205px]
            -translate-y-1
            flex-col
            items-center
            text-center

            sm:w-[62%]
            sm:max-w-[235px]

            md:w-full
            md:max-w-[760px]
            md:-translate-y-1
          "
        >
          {/* ================================================= */}
          {/* DATA FOUNDRY */}
          {/* ================================================= */}

          <div
            className="
              mb-2
              flex
              items-center
              gap-1.5

              text-[7px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-slate-400

              sm:text-[8px]

              md:mb-3
              md:-translate-y-1
              md:gap-2
              md:text-[10px]
              md:tracking-[0.2em]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-emerald-400
                shadow-[0_0_6px_rgba(52,211,153,0.3)]
              "
            />

            Data Foundry
          </div>

          {/* ================================================= */}
          {/* NAME */}
          {/* ================================================= */}

          <h1
            className="
              max-w-full

              text-[25px]
              font-bold
              leading-[1.08]
              tracking-tight
              text-white

              sm:text-[28px]

              md:text-[36px]
              md:leading-[1.15]
              lg:text-[40px]
            "
          >
            Gyaneshwar Suryavanshi
          </h1>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <p
            className="
              mt-3
              w-full
              max-w-[195px]

              text-[10px]
              leading-[1.45]
              text-slate-300

              sm:mt-3
              sm:max-w-[220px]
              sm:text-[11px]

              md:mt-4
              md:max-w-[570px]
              md:text-[15px]
              md:leading-[1.7]
            "
          >
            Data Engineering & SQL Specialist building analytics
            platforms, ETL pipelines, and dashboard-driven insights.
          </p>

          {/* ================================================= */}
          {/* SKILLS */}
          {/* ================================================= */}

          <div
            className="
              mt-4
              flex
              w-full
              max-w-[205px]
              flex-wrap
              justify-center
              gap-1.5

              sm:mt-4
              sm:max-w-[230px]
              sm:gap-2

              md:mt-5
              md:max-w-[650px]
              md:gap-2
            "
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-md
                  border
                  border-slate-600/80
                  bg-slate-950/55

                  px-2
                  py-1

                  text-[9px]
                  font-medium
                  text-slate-200

                  backdrop-blur-sm

                  transition-all
                  duration-200

                  hover:border-slate-400/80
                  hover:bg-slate-900/70
                  hover:text-white

                  sm:px-2.5
                  sm:py-1
                  sm:text-[10px]

                  md:rounded-lg
                  md:px-3
                  md:py-1.5
                  md:text-xs
                "
              >
                {skill}
              </span>
            ))}
          </div>

          {/* ================================================= */}
          {/* ACTION BUTTONS */}
          {/* ================================================= */}

          <div
            className="
              mt-4
              flex
              w-full
              max-w-[205px]
              flex-col
              gap-2

              sm:mt-5
              sm:max-w-[230px]
              sm:gap-2.5

              md:mt-6
              md:max-w-[430px]
              md:flex-row
              md:items-center
              md:justify-center
              md:gap-3
            "
          >
            <Link
              to="/workbench"
              className="
                inline-flex
                h-9
                w-full
                items-center
                justify-center

                rounded-lg

                bg-blue-600

                px-3

                text-[10px]
                font-semibold
                text-white

                shadow-lg
                shadow-blue-600/15

                transition-all
                duration-200

                hover:bg-blue-500

                active:scale-[0.98]

                sm:h-10
                sm:text-[11px]
                sm:rounded-xl

                md:h-11
                md:w-[205px]
                md:rounded-xl
                md:px-5
                md:text-sm
              "
            >
              Launch Workspace →
            </Link>

            <Link
              to="/workbench/profile"
              className="
                inline-flex
                h-9
                w-full
                items-center
                justify-center

                rounded-lg

                border
                border-slate-600/80

                bg-slate-950/55

                px-3

                text-[10px]
                font-semibold
                text-slate-200

                backdrop-blur-sm

                transition-all
                duration-200

                hover:border-slate-400
                hover:bg-slate-900/70
                hover:text-white

                active:scale-[0.98]

                sm:h-10
                sm:text-[11px]
                sm:rounded-xl

                md:h-11
                md:w-[205px]
                md:rounded-xl
                md:px-5
                md:text-sm
              "
            >
              My Profile →
            </Link>
          </div>
        </div>
      </main>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer
        className="
          absolute
          bottom-4
          left-0
          right-0
          z-10

          px-4

          text-center
          text-[9px]
          text-slate-500

          sm:bottom-5
          sm:text-[10px]

          md:text-[11px]
          lg:text-xs
        "
      >
        Built with React • FastAPI • PostgreSQL
      </footer>
    </div>
  );
}