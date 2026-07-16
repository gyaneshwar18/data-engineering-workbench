import {
  Award,
  ExternalLink,
} from "lucide-react";

const certifications = [
  {
    title: "AWS Academy Cloud Foundations",
    provider: "AWS Academy",
    year: "2024",
    logo: "☁️",
    verified: true,
  },
  {
    title: "Google IT Automation with Python",
    provider: "Google",
    year: "2024",
    logo: "🐍",
    verified: true,
  },
  {
    title: "Google UX Design",
    provider: "Google",
    year: "2024",
    logo: "🎨",
    verified: true,
  },
  {
    title: "C Programming",
    provider: "IIT Bombay",
    year: "2023",
    logo: "💻",
    verified: true,
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
            items-center
            justify-center
            rounded-xl
            border
            border-amber-500/20
            bg-amber-500/10
          "
        >
          <Award
            size={20}
            className="text-amber-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            Certifications
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
            "
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                <div
                  className="
                    flex
                    h-12
                    w-12
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

                <div>

                  <h3 className="font-semibold text-white leading-6">
                    {cert.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {cert.provider}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Issued • {cert.year}
                  </p>

                </div>

              </div>

              {cert.verified && (

                <span
                  className="
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-emerald-400
                  "
                >
                  Verified
                </span>

              )}

            </div>

            <div className="mt-5">

              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-700
                  px-3
                  py-2
                  text-sm
                  text-slate-300
                  transition-all
                  hover:border-blue-500
                  hover:text-white
                "
              >
                Verify

                <ExternalLink size={15} />

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}