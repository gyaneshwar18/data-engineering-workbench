import {
  MapPin,
  Building2,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Download,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ProfileHeader() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-8
        shadow-sm
      "
    >
      {/* Top */}

      <div className="flex items-start justify-between gap-8 flex-wrap">

        {/* Left */}

        <div className="flex gap-6">

          {/* Avatar */}

          <div
            className="
              h-28
              w-28
              rounded-3xl
              bg-gradient-to-br
              from-blue-500
              to-cyan-500
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              text-white
              shrink-0
            "
          >
            GS
          </div>

          {/* Info */}

          <div>

            <div className="flex items-center gap-3 flex-wrap">

              <h1 className="text-3xl font-bold text-white">
                Gyaneshwar Suryavanshi
              </h1>

              <span
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-500/10
                  border
                  border-emerald-500/20
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-400
                "
              >
                <CheckCircle2 size={14} />
                Open to Opportunities
              </span>

            </div>

            <p className="mt-2 text-slate-300 text-lg">
              Data Engineer
            </p>

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">

              <div className="flex items-center gap-2">

                <Building2 size={16} />

                <span>
                  Software Engineer
                </span>

              </div>

              <div className="flex items-center gap-2">

                <Briefcase size={16} />

                <span>
                  1+ Years Experience
                </span>

              </div>

              <div className="flex items-center gap-2">

                <MapPin size={16} />

                <span>
                  Hyderabad, India
                </span>

              </div>

            </div>

            {/* Specialization */}

            <div className="mt-6 flex flex-wrap gap-2">

              {[
                "Python",
                "SQL",
                "PostgreSQL",
                "PySpark",
                "FastAPI",
                "React",
              ].map((skill) => (

                <span
                  key={skill}
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
                    transition-all
                    hover:border-blue-500
                    hover:text-white
                  "
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-3">

          <Link
            to="/dashboard"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-5
              py-3
              text-sm
              font-medium
              text-slate-200
              transition-all
              hover:border-blue-500
              hover:bg-slate-800/80
            "
          >
            <ArrowLeft size={17} />
            Open Workspace
          </Link>

          <a
            href="/resume.pdf"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-blue-500
            "
          >
            <Download size={17} />
            Download Resume
          </a>

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 border-t border-slate-800 pt-6">

        <div className="flex flex-wrap items-center gap-8">

          <a
            href="mailto:your@email.com"
            className="
              flex
              items-center
              gap-2
              text-sm
              text-slate-400
              hover:text-white
              transition-colors
            "
          >
            <Mail size={17} />
            Email
          </a>

          <a
            href="https://github.com/gyaneshwar18"
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-2
              text-sm
              text-slate-400
              hover:text-white
              transition-colors
            "
          >
            <Github size={17} />
            GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-2
              text-sm
              text-slate-400
              hover:text-white
              transition-colors
            "
          >
            <Linkedin size={17} />
            LinkedIn
          </a>

        </div>

      </div>

    </section>
  );
}