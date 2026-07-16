import {
  BriefcaseBusiness,
  CalendarDays,
  Building2,
} from "lucide-react";

const experiences = [
  {
    company: "React Developer Intern",
    organization: "Confidential Organization",
    duration: "2025 • 3 Months",
    description:
      "Developed modern React components, integrated REST APIs, improved UI/UX consistency, and collaborated on production-ready frontend features.",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "REST API",
      "Git",
    ],
  },
  {
    company: "Sales Support Associate",
    organization: "SAP CRM",
    duration: "2024 • 3 Months",
    description:
      "Worked with CRM operations, data validation, reporting workflows, and customer data management while supporting business operations.",
    tech: [
      "SAP CRM",
      "Excel",
      "SQL",
      "Reporting",
    ],
  },
];

export default function ExperienceTimeline() {
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
            border-violet-500/20
            bg-violet-500/10
          "
        >
          <BriefcaseBusiness
            size={20}
            className="text-violet-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            Experience
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Professional journey and engineering experience
          </p>

        </div>

      </div>

      {/* Timeline */}

      <div className="mt-8 space-y-8">

        {experiences.map((item, index) => (

          <div
            key={index}
            className="relative pl-10"
          >

            {/* Timeline */}

            {index !== experiences.length - 1 && (
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
                h-7
                w-7
                rounded-full
                border
                border-blue-500/30
                bg-blue-500/10
                flex
                items-center
                justify-center
              "
            >
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            </div>

            {/* Card */}

            <div
              className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-950/60
                p-5
                transition-all
                hover:border-blue-500/30
              "
            >

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    {item.company}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-5 text-sm text-slate-400">

                    <span className="flex items-center gap-2">

                      <Building2 size={15} />

                      {item.organization}

                    </span>

                    <span className="flex items-center gap-2">

                      <CalendarDays size={15} />

                      {item.duration}

                    </span>

                  </div>

                </div>

              </div>

              <p className="mt-5 text-[15px] leading-7 text-slate-300">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                {item.tech.map((tech) => (

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

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}