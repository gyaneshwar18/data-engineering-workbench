import {
  MapPin,
  Building2,
  Briefcase,
  Download,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileHeader() {
  const skills = [
    "Python",
    "SQL",
    "PostgreSQL",
    "PySpark",
    "FastAPI",
    "React",
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-700/60
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        p-8
      "
    >
      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-8">

        {/* LEFT */}

        <div className="flex flex-1 items-start gap-6">

          {/* Avatar */}

          <div className="relative shrink-0">

            {/* Soft Glow */}
            <div className="absolute -inset-1 rounded-[24px] bg-cyan-400/15 blur-lg" />

            {/* Avatar Card */}
            <div
              className="
      relative
      h-24
      w-24
      overflow-hidden
      rounded-2xl
      border
      border-slate-600/60
      bg-slate-800
      shadow-lg
    "
            >
              <img
                src="/images/developer-avatar.svg"
                alt="Developer"
                className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
      "
              />
            </div>

            {/* Online Indicator */}
            <span
              className="
      absolute
      bottom-0.5
      right-0.5
      h-4
      w-4
      rounded-full
      border-2
      border-slate-900 
      bg-emerald-400
      shadow-[0_0_10px_#4ade80]
    "
            />
          </div>

          {/* INFO */}

          <div className="flex-1">

            <div className="flex items-center gap-3 flex-wrap">

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Gyaneshwar Suryavanshi
              </h1>

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-emerald-500/30
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-emerald-400
                "
              >
                <CheckCircle2 size={13} />
                Open to Work
              </span>

            </div>

            <p className="mt-2 text-base font-medium text-cyan-300">
              Data Engineer • Azure Data Platform
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Passionate about designing scalable ETL pipelines, modern data
              platforms, cloud analytics and distributed processing using
              Python, Spark, PostgreSQL and Azure.
            </p>

            {/* Pills */}

            <div className="mt-5 flex flex-wrap gap-3">

              {[
                {
                  icon: <Building2 size={14} />,
                  text: "Software Engineer",
                },
                {
                  icon: <Briefcase size={14} />,
                  text: "1+ Years",
                },
                {
                  icon: <MapPin size={14} />,
                  text: "Hyderabad",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800/60
                    px-3
                    py-2
                    text-sm
                    text-slate-300
                    transition-all
                    duration-300
                    hover:border-cyan-500/40
                  "
                >
                  <span className="text-cyan-400">{item.icon}</span>
                  {item.text}
                </div>
              ))}

            </div>

            {/* Skill Badges */}

            <div className="mt-5 flex flex-wrap gap-2">

              {skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-cyan-300
                    shadow-[0_0_12px_rgba(6,182,212,0.18)]
                    transition-all
                    duration-300
                    hover:border-cyan-400
                    hover:bg-cyan-500/15
                    hover:shadow-[0_0_18px_rgba(6,182,212,0.35)]
                  "
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>
        {/* RIGHT */}

        <div className="flex shrink-0 flex-col gap-3">

          <Link
            to="/dashboard"
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-700
              bg-slate-800/60
              px-5
              py-3
              text-sm
              font-medium
              text-slate-200
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-cyan-500/40
              hover:bg-slate-800
            "
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Open Workspace
          </Link>

          <a
            href="/resume.pdf"
            download
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              hover:shadow-cyan-500/30
            "
          >
            <Download size={16} />
            Resume
          </a>

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-6 flex flex-wrap items-center justify-between border-t border-slate-700/60 pt-5">

        <div className="flex items-center gap-5 text-sm text-slate-400">

          <a
            href="mailto:your@email.com"
            className="transition hover:text-cyan-400"
          >
            Email
          </a>

          <span className="text-slate-700">•</span>

          <a
            href="https://github.com/gyaneshwar18"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-400"
          >
            GitHub
          </a>

          <span className="text-slate-700">•</span>

          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-400"
          >
            LinkedIn
          </a>

        </div>

        <div
          className="
            rounded-full
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-cyan-300
          "
        >
          Available for Full-Time Opportunities
        </div>

      </div>

    </section>
  );
}