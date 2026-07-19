import {
  FileText,
  Download,
  Eye,
} from "lucide-react";

export default function ResumeCard() {
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
            border-rose-500/20
            bg-rose-500/10
          "
        >
          <FileText
            size={20}
            className="text-rose-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            Resume
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Professional resume with experience, projects and technical skills.
          </p>

        </div>

      </div>

      {/* Card */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-slate-800
          bg-slate-950/60
          p-6
        "
      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div className="flex items-center gap-5">

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-700
                bg-slate-800
              "
            >
              <FileText
                size={30}
                className="text-blue-400"
              />
            </div>

            <div>

              <h3 className="text-lg font-semibold text-white">
                Gyaneshwar_Suryavanshi_Resume.pdf
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Latest resume including projects, certifications,
                technical skills and professional experience.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">

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
                  Updated
                </span>

                <span
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
                  PDF
                </span>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="flex flex-wrap gap-3">

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
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
                duration-200
                hover:border-blue-500
                hover:text-white
              "
            >
              <Eye size={17} />
              View PDF
            </a>

            <a
              href="/resume.pdf"
              download
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-200
                hover:bg-blue-500
              "
            >
              <Download size={17} />
              Download
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}