import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";

const RESUME_URL = "/resume/Gyaneshwar_Suryavanshi_Resume.pdf";

export default function ResumeCard() {
  const [isOpen, setIsOpen] = useState(false);

  /* Prevent background scrolling while PDF modal is open */
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close with Escape */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* ================================================= */}
      {/* RESUME SECTION                                    */}
      {/* ================================================= */}

      <section
        className="
          relative
          overflow-hidden

          rounded-3xl

          border
          border-slate-800

          bg-slate-900/90

          p-4
          sm:p-6

          shadow-sm
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
            bg-rose-500/5
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

          {/* ============================================= */}
          {/* HEADER                                        */}
          {/* ============================================= */}

          <div className="flex items-center gap-3 sm:gap-4">

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
                border-rose-500/20

                bg-rose-500/10
              "
            >
              <FileText
                size={19}
                className="text-rose-400"
              />
            </div>

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
                Resume
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-400

                  sm:text-sm
                "
              >
                Professional resume, experience, projects and technical skills
              </p>

            </div>

          </div>

          {/* ============================================= */}
          {/* RESUME CARD                                   */}
          {/* ============================================= */}

          <div
            className="
              mt-6

              rounded-2xl

              border
              border-slate-800

              bg-slate-950/60

              p-4

              sm:mt-8
              sm:p-5
            "
          >

            <div
              className="
                flex
                flex-col
                gap-5

                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >

              {/* ========================================= */}
              {/* RESUME INFORMATION                       */}
              {/* ========================================= */}

              <div
                className="
                  flex
                  min-w-0
                  items-start
                  gap-4

                  sm:gap-5
                "
              >

                {/* PDF Icon */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center

                    rounded-2xl

                    border
                    border-slate-700

                    bg-slate-800

                    sm:h-16
                    sm:w-16
                  "
                >
                  <FileText
                    size={27}
                    className="text-blue-400"
                  />
                </div>

                {/* Details */}

                <div className="min-w-0">

                  <h3
                    className="
                      break-words

                      text-base
                      font-semibold
                      leading-6
                      text-white

                      sm:text-lg
                    "
                  >
                    Gyaneshwar_Suryavanshi_Resume.pdf
                  </h3>

                  <p
                    className="
                      mt-1.5
                      max-w-2xl

                      text-xs
                      leading-5
                      text-slate-400

                      sm:mt-2
                      sm:text-sm
                    "
                  >
                    Latest resume covering professional experience,
                    projects, certifications and technical skills.
                  </p>

                  {/* Badges */}

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span
                      className="
                        rounded-full

                        border
                        border-emerald-500/20

                        bg-emerald-500/10

                        px-2.5
                        py-1

                        text-[10px]
                        font-medium
                        text-emerald-400

                        sm:px-3
                        sm:text-xs
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

                        px-2.5
                        py-1

                        text-[10px]
                        font-medium
                        text-slate-300

                        sm:px-3
                        sm:text-xs
                      "
                    >
                      PDF
                    </span>

                  </div>

                </div>

              </div>

              {/* ========================================= */}
              {/* ACTIONS                                   */}
              {/* ========================================= */}

              <div
                className="
                  flex
                  w-full
                  gap-2.5

                  lg:w-auto
                  lg:shrink-0
                "
              >

                {/* View */}

                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="
                    inline-flex
                    h-10
                    flex-1
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    border
                    border-slate-700

                    bg-slate-800

                    px-4

                    text-xs
                    font-medium
                    text-slate-200

                    transition-all
                    duration-200

                    hover:border-blue-500/50
                    hover:bg-slate-800/80
                    hover:text-white

                    sm:h-11
                    sm:px-5
                    sm:text-sm

                    lg:flex-none
                  "
                >
                  <Eye size={16} />

                  View PDF
                </button>

                {/* Download */}

                <a
                  href={RESUME_URL}
                  download
                  className="
                    inline-flex
                    h-10
                    flex-1
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    bg-blue-600

                    px-4

                    text-xs
                    font-medium
                    text-white

                    transition-all
                    duration-200

                    hover:bg-blue-500
                    hover:shadow-lg
                    hover:shadow-blue-500/20

                    sm:h-11
                    sm:px-5
                    sm:text-sm

                    lg:flex-none
                  "
                >
                  <Download size={16} />

                  Download
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* PDF MODAL                                         */}
      {/* ================================================= */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]

            flex
            items-center
            justify-center

            bg-slate-950/90
            backdrop-blur-md

            p-0
            sm:p-4
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >

          {/* ============================================= */}
          {/* VIEWER                                       */}
          {/* ============================================= */}

          <div
            className="
              flex
              h-full
              w-full
              flex-col

              overflow-hidden

              bg-slate-900

              sm:h-[94vh]
              sm:max-w-5xl

              sm:rounded-2xl
              sm:border
              sm:border-slate-700
              sm:shadow-2xl
            "
          >

            {/* ========================================= */}
            {/* MODAL HEADER                              */}
            {/* ========================================= */}

            <div
              className="
                flex
                h-14
                shrink-0
                items-center
                justify-between

                border-b
                border-slate-700

                bg-slate-900

                px-3

                sm:px-5
              "
            >

              <div className="flex min-w-0 items-center gap-2.5">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    bg-blue-500/10
                  "
                >
                  <FileText
                    size={16}
                    className="text-blue-400"
                  />
                </div>

                <span
                  className="
                    truncate
                    text-xs
                    font-medium
                    text-slate-200

                    sm:text-sm
                  "
                >
                  Gyaneshwar_Suryavanshi_Resume.pdf
                </span>

              </div>

              <div className="flex items-center gap-1.5">

                {/* Open externally */}

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  title="Open in new tab"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center

                    rounded-lg

                    text-slate-400

                    transition-colors

                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  <ExternalLink size={16} />
                </a>

                {/* Close */}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close resume viewer"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center

                    rounded-lg

                    text-slate-400

                    transition-colors

                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  <X size={19} />
                </button>

              </div>

            </div>

            {/* ========================================= */}
            {/* PDF VIEWER                                */}
            {/* ========================================= */}

            <div className="min-h-0 flex-1 bg-slate-800">

              <iframe
                src={`${RESUME_URL}#view=FitH`}
                title="Gyaneshwar Suryavanshi Resume"
                className="h-full w-full border-0"
              />

            </div>

          </div>

        </div>
      )}
    </>
  );
}