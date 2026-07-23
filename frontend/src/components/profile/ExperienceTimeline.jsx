import {
  BriefcaseBusiness,
  CalendarDays,
  Building2,
} from "lucide-react";

const experiences = [
  {
    company: "Software Engineer",
    organization: "National Informatics Centre (NIC) • Sarathi Project",
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
        p-6
      "
    >
      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />

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
            <BriefcaseBusiness
              size={20}
              className="text-cyan-400"
            />
          </div>

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Experience
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Professional journey and industry experience
            </p>

          </div>

        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-gradient-to-r from-cyan-500/10 via-slate-700 to-transparent" />

        {/* Timeline */}

        <div className="space-y-8">

          {experiences.map((item, index) => (

            <div
              key={index}
              className="relative pl-12"
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
                <div className="h-3 w-3 rounded-full bg-cyan-400" />
              </div>

              {/* Experience Card */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-700/50
                  bg-slate-800/25
                  p-5
                  transition-all
                  duration-300
                  hover:border-cyan-500/30
                  hover:bg-slate-800/35
                "
              >

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      {item.company}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-5 text-sm text-slate-400">

                      <span className="flex items-center gap-2">

                        <Building2
                          size={15}
                          className="text-cyan-400"
                        />

                        {item.organization}

                      </span>

                      <span className="flex items-center gap-2">

                        <CalendarDays
                          size={15}
                          className="text-cyan-400"
                        />

                        {item.duration}

                      </span>

                    </div>

                  </div>

                </div>
                <p className="mt-5 text-[15px] leading-8 text-slate-300">
                  {item.description}
                </p>

                {/* Tech Stack */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {item.tech.map((tech) => (

                    <span
                      key={tech}
                      className="
                          rounded-full
                          border
                          border-emerald-500/20
                          bg-emerald-500/10
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-emerald-300
                          shadow-[0_0_10px_rgba(16,185,129,0.10)]
                          transition-all
                          duration-300
                          hover:border-emerald-400/35
                          hover:bg-emerald-500/15
                          hover:shadow-[0_0_18px_rgba(16,185,129,0.18)]
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