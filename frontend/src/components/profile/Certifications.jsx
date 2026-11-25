import { Award } from "lucide-react";

const certifications = [
  {
    title: "Data Engineering with Python",
    provider: "dltHub",
    logo: "🐍",
  },
  {
    title: "Data Engineering on Databricks",
    provider: "Databricks Academy",
    logo: "📊",
  },
  {
    title: "Azure Data Factory & Databricks",
    provider: "Simplilearn SkillUp",
    logo: "☁️",
  },
  {
    title: "Completed LeetCode SQL 50 Study Plan",
    provider: "Completion badge earned",
    logo: "🗄️",
  },
  {
    title: "Contributed to open-source projects on GitHub",
    provider: "Achievement badges earned",
    logo: "📊",
  },
];

export default function Certifications() {
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
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-amber-500/20
            bg-amber-500/10
          "
        >
          <Award size={20} className="text-amber-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-white">
            CERTIFICATIONS &amp; ACHIEVEMENTS
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Professional certifications and continuous learning
          </p>
        </div>
      </div>

      {/* Cards */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {certifications.map((cert) => (
          <div
            key={cert.title}
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-950/60
              p-5
              transition-all
              duration-200
              hover:border-amber-500/30
              hover:bg-slate-950/80
            "
          >
            <div className="flex items-start gap-4">
              {/* Certificate Icon */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  text-2xl
                "
              >
                {cert.logo}
              </div>

              {/* Certificate Details */}
              <div className="min-w-0">
                <h3 className="font-semibold leading-6 text-white">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {cert.provider}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
