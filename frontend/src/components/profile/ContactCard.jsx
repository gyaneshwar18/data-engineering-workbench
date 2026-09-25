import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  BriefcaseBusiness,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function ContactCard() {
  const email = "suryavanshigyaneshwar@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const [copied, setCopied] = useState(false);

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-4
        sm:p-6
        shadow-sm
      "
    >
      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

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
            border-emerald-500/20
            bg-emerald-500/10
            sm:h-11
            sm:w-11
          "
        >
          <Mail
            size={19}
            className="text-emerald-400 sm:h-5 sm:w-5"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Contact
          </h2>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Professional contact information
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* CONTACT GRID                                      */}
      {/* ================================================= */}

      <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">

        {/* ================= EMAIL ================= */}

        <div
          className="
            min-w-0
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/60
            p-4
            sm:p-5
          "
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

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
                border-blue-500/20
                bg-blue-500/10
              "
            >
              <Mail
                size={18}
                className="text-blue-400"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-500">
                Email
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  font-medium
                  text-white
                  sm:text-sm
                "
                title={email}
              >
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              title={copied ? "Copied" : "Copy email"}
              className={`
                      shrink-0
                      rounded-lg
                      border
                      p-2
                      transition-all
                      duration-200
                      ${copied
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-slate-700 text-slate-400 hover:border-blue-500 hover:text-white"
                }
              `}
            >
              {copied ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}
            </button>
          </div>
        </div>

        {/* ================= GITHUB ================= */}

        <a
          href="https://github.com/gyaneshwar18"
          target="_blank"
          rel="noreferrer"
          className="
            min-w-0
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/60
            p-4
            transition-all
            hover:border-blue-500/30
            sm:p-5
          "
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-slate-800
              "
            >
              <Github
                size={18}
                className="text-white"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                GitHub
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white sm:text-sm">
                github.com/gyaneshwar18
              </p>
            </div>
          </div>
        </a>

        {/* ================= LINKEDIN ================= */}

        <a
          href="https://www.linkedin.com/in/suryavanshi-gyaneshwar-a646b1206/"
          target="_blank"
          rel="noreferrer"
          className="
            min-w-0
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/60
            p-4
            transition-all
            hover:border-blue-500/30
            sm:p-5
          "
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

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
                border-blue-500/20
                bg-blue-500/10
              "
            >
              <Linkedin
                size={18}
                className="text-blue-400"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                LinkedIn
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white sm:text-sm">
                linkedin.com/gyaneshwar
              </p>
            </div>
          </div>
        </a>

        {/* ================= LOCATION ================= */}

        <div
          className="
            min-w-0
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/60
            p-4
            sm:p-5
          "
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

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
                border-emerald-500/20
                bg-emerald-500/10
              "
            >
              <MapPin
                size={18}
                className="text-emerald-400"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                Location
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white sm:text-sm">
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* AVAILABILITY                                      */}
      {/* ================================================= */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          p-4
          sm:mt-6
          sm:p-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-5
          "
        >
          {/* Left */}

          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/20
                sm:h-11
                sm:w-11
              "
            >
              <BriefcaseBusiness
                size={19}
                className="text-emerald-400"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                Open to Data Engineering Opportunities
              </h3>

              <p className="mt-1 text-xs leading-5 text-emerald-300 sm:text-sm">
                Available for Full-time • Internship • Entry-level Roles
              </p>
            </div>
          </div>

          {/* CTA */}

          <a
            href={`mailto:${email}`}
            className="
                inline-flex
                w-full
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-500
                px-5
                py-2.5
                text-sm
                font-semibold
                text-black
                transition-all
                hover:bg-emerald-400
                sm:w-auto
                sm:py-3
              "
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}