import {
  BriefcaseBusiness,
  CalendarDays,
  Building2,
} from "lucide-react";

const experiences = [
  {
    company: "Software Engineer",
    organization:
      "National Informatics Centre (NIC) • Sarathi Project",
    duration: "Jul 2025 – Present",
    description:
      "Contribute to the Sarathi application by analyzing database-related issues, investigating production scenarios, and delivering SQL-based solutions. Design and optimize SQL queries, prepare analytical reports, validate data integrity, troubleshoot complex database cases, improve query performance, and collaborate with cross-functional teams to ensure reliable and efficient application workflows.",
    tech: [
      "SQL",
      "PostgreSQL",
      "Query Optimization",
      "Reporting",
      "Database Analysis",
      "Performance Tuning",
    ],
  },
];

export default function ExperienceSection() {
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
        p-5
        sm:p-6
      "
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-cyan-500/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-40
          w-40
          rounded-full
          bg-blue-500/5
          blur-3xl
        "
      />

      <div className="relative">

        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-500/20
              bg-cyan-500/10
              shadow-[0_0_15px_rgba(6,182,212,0.08)]
            "
          >
            <BriefcaseBusiness
              size={20}
              className="text-cyan-400"
            />
          </div>

          <div className="min-w-0">

            <h2
              className="
                text-xl
                font-semibold
                tracking-tight
                text-white
              "
            >
              Experience
            </h2>

            <p
              className="
                mt-1
                text-sm
                leading-5
                text-slate-400
              "
            >
              Professional journey and industry experience
            </p>

          </div>
        </div>

        {/* Divider */}

        <div
          className="
            my-5
            h-px
            bg-gradient-to-r
            from-cyan-500/10
            via-slate-700
            to-transparent
          "
        />

        {/* ================================================= */}
        {/* EXPERIENCE LIST                                  */}
        {/* ================================================= */}

        <div className="space-y-8">

          {experiences.map((item, index) => (

            <div
              key={index}
              className="
                relative

                lg:pl-12
              "
            >

              {/* ========================================= */}
              {/* DESKTOP TIMELINE                         */}
              {/* ========================================= */}

              <div
                className="
                  hidden
                  lg:block
                "
              >

                {/* Timeline Line */}

                {index !== experiences.length - 1 && (
                  <div
                    className="
                      absolute
                      left-[17px]
                      top-10
                      h-full
                      w-px

                      bg-gradient-to-b
                      from-cyan-500/40
                      via-slate-700
                      to-transparent
                    "
                  />
                )}

                {/* Timeline Dot */}

                <div
                  className="
                    absolute
                    left-0
                    top-1

                    flex
                    h-9
                    w-9
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-cyan-500/30

                    bg-cyan-500/10

                    shadow-[0_0_15px_rgba(6,182,212,0.18)]
                  "
                >
                  <div
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_10px_rgba(34,211,238,0.7)]
                    "
                  />
                </div>

              </div>

              {/* ========================================= */}
              {/* EXPERIENCE CARD                          */}
              {/* ========================================= */}

              <div
                className="
                  rounded-2xl

                  border
                  border-slate-700/50

                  bg-slate-800/25

                  p-4
                  sm:p-5

                  transition-all
                  duration-300

                  hover:border-cyan-500/30
                  hover:bg-slate-800/35
                "
              >

                {/* ===================================== */}
                {/* ROLE                                  */}
                {/* ===================================== */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >

                  <div className="min-w-0">

                    <div className="flex items-center gap-2">

                      {/* Mobile Accent Dot */}

                      <span
                        className="
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          bg-cyan-400
                          shadow-[0_0_8px_rgba(34,211,238,0.7)]

                          lg:hidden
                        "
                      />

                      <h3
                        className="
                          text-base
                          font-semibold
                          text-white

                          sm:text-lg
                        "
                      >
                        {item.company}
                      </h3>

                    </div>

                    {/* Organization */}

                    <div
                      className="
                        mt-2
                        flex
                        items-start
                        gap-2

                        text-xs
                        leading-5
                        text-slate-400

                        sm:text-sm
                      "
                    >

                      <Building2
                        size={14}
                        className="
                          mt-0.5
                          shrink-0
                          text-cyan-400
                        "
                      />

                      <span>
                        {item.organization}
                      </span>

                    </div>

                  </div>

                </div>

                {/* ===================================== */}
                {/* DATE                                  */}
                {/* ===================================== */}

                <div
                  className="
                    mt-3

                    inline-flex
                    items-center
                    gap-2

                    rounded-lg
                    border
                    border-slate-700/50
                    bg-slate-800/40

                    px-2.5
                    py-1.5

                    text-xs
                    text-slate-400
                  "
                >

                  <CalendarDays
                    size={13}
                    className="text-cyan-400"
                  />

                  {item.duration}

                </div>

                {/* ===================================== */}
                {/* DESCRIPTION                           */}
                {/* ===================================== */}

                <p
                  className="
                    mt-4

                    text-sm
                    leading-6
                    text-slate-300

                    sm:mt-5
                    sm:text-[15px]
                    sm:leading-7
                  "
                >
                  {item.description}
                </p>

                {/* ===================================== */}
                {/* TECHNOLOGIES                          */}
                {/* ===================================== */}

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

                  {item.tech.map((tech) => (

                    <span
                      key={tech}
                      className="
                        rounded-full

                        border
                        border-emerald-500/20

                        bg-emerald-500/10

                        px-2.5
                        py-1

                        text-[10px]
                        font-medium
                        text-emerald-300

                        shadow-[0_0_10px_rgba(16,185,129,0.10)]

                        transition-all
                        duration-300

                        hover:border-emerald-400/35
                        hover:bg-emerald-500/15

                        sm:px-3
                        sm:text-xs
                      "
                    >
                      {tech}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}