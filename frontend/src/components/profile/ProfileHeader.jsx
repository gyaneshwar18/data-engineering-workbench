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

  const infoItems = [
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
  ];

  return (
    <section
      className="
        relative
        overflow-hidden

        rounded-2xl
        sm:rounded-3xl

        border
        border-slate-700/60

        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950

        px-4
        py-5

        sm:px-7
        sm:py-7

        lg:px-8
        lg:py-7
      "
    >
      {/* ===================================================== */}
      {/* BACKGROUND GLOW                                      */}
      {/* ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-56
          w-56
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div className="relative">

        {/* ================================================= */}
        {/* IDENTITY + DESKTOP ACTIONS                       */}
        {/* ================================================= */}

        <div
          className="
            flex
            flex-col

            lg:flex-row
            lg:items-start
            lg:justify-between
            lg:gap-8
          "
        >

          {/* ================================================= */}
          {/* IDENTITY                                          */}
          {/* ================================================= */}

          <div className="min-w-0 flex-1">

            <div
              className="
                flex
                items-start

                gap-3

                sm:gap-4
              "
            >

              {/* ================================================= */}
              {/* AVATAR                                            */}
              {/* ================================================= */}

              <div
                className="
                  relative
                  shrink-0

                  mt-1

                  sm:mt-0
                "
              >

                {/* Soft Glow */}

                <div
                  className="
                    absolute
                    -inset-1
                    rounded-2xl
                    bg-cyan-400/15
                    blur-lg
                  "
                />

                {/* Avatar */}

                <div
                  className="
                    relative

                    h-[72px]
                    w-[72px]

                    overflow-hidden
                    rounded-2xl

                    border
                    border-slate-600/70

                    bg-slate-800

                    sm:h-[88px]
                    sm:w-[88px]
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
                    bottom-0
                    right-0

                    h-3.5
                    w-3.5

                    rounded-full

                    border-2
                    border-slate-900

                    bg-emerald-400

                    shadow-[0_0_10px_#4ade80]
                  "
                />

              </div>

              {/* ================================================= */}
              {/* NAME / ROLE                                       */}
              {/* ================================================= */}

              <div
                className="
                  min-w-0
                  flex-1

                  pt-0.5

                  pr-1
                "
              >

                {/* NAME */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-wrap
                    items-center
                    gap-2
                  "
                >

                  <h1
                    className="
                      min-w-0
                      whitespace-nowrap

                      text-[18px]
                      font-bold
                      leading-tight
                      tracking-[-0.02em]
                      text-white

                      sm:text-2xl
                      sm:tracking-tight

                      lg:text-3xl
                    "
                  >
                    Gyaneshwar Suryavanshi
                  </h1>

                  {/* Open to Work */}

                  <span
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      gap-1.5

                      rounded-full

                      border
                      border-emerald-500/30

                      bg-emerald-500/10

                      px-2
                      py-1

                      text-[10px]
                      font-semibold
                      text-emerald-400

                      sm:px-2.5
                      sm:text-[11px]
                    "
                  >
                    <CheckCircle2 size={11} />
                    Open to Work
                  </span>

                </div>

                {/* ROLE */}

                <p
                  className="
                    mt-1.5

                    max-w-xl

                    text-xs
                    font-medium
                    leading-5
                    text-cyan-300

                    sm:mt-2
                    sm:text-base
                  "
                >
                  Data Engineer • Azure Platform
                </p>

              </div>

            </div>

            {/* ================================================= */}
            {/* DESCRIPTION                                       */}
            {/* ================================================= */}

            <p
              className="
                mt-5

                max-w-3xl

                text-sm
                leading-6
                text-slate-400

                sm:mt-6
              "
            >
              Passionate about designing scalable ETL pipelines,
              modern data platforms, cloud analytics and distributed
              processing using Python, Spark, PostgreSQL and Azure.
            </p>

            {/* ================================================= */}
            {/* INFO                                              */}
            {/* ================================================= */}

            <div
              className="
                mt-4

                flex
                flex-wrap
                gap-2
              "
            >
              {infoItems.map((item) => (
                <div
                  key={item.text}
                  className="
                    inline-flex
                    items-center
                    gap-1.5

                    rounded-lg

                    border
                    border-slate-700/80

                    bg-slate-800/50

                    px-2.5
                    py-1.5

                    text-xs
                    text-slate-300
                  "
                >
                  <span className="text-cyan-400">
                    {item.icon}
                  </span>

                  {item.text}
                </div>
              ))}
            </div>

            {/* ================================================= */}
            {/* SKILLS                                            */}
            {/* ================================================= */}

            <div
              className="
                mt-4

                flex
                flex-wrap
                gap-1.5
              "
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full

                    border
                    border-cyan-500/20

                    bg-cyan-500/10

                    px-2.5
                    py-1

                    text-[11px]
                    font-medium
                    text-cyan-300

                    transition-colors
                    duration-200

                    hover:border-cyan-400/40
                    hover:bg-cyan-500/15
                  "
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

          {/* ================================================= */}
          {/* DESKTOP ACTIONS                                  */}
          {/* ================================================= */}

          <div
            className="
              mt-5
              flex
              gap-2.5

              lg:mt-0
              lg:w-[145px]
              lg:shrink-0
              lg:flex-col
            "
          >

            <Link
              to="/workbench"
              className="
                group

                inline-flex
                h-10
                flex-1
                items-center
                justify-center
                gap-2

                rounded-lg

                border
                border-slate-700

                bg-slate-800/60

                px-3

                text-xs
                font-semibold
                text-slate-200

                transition-all
                duration-200

                hover:border-cyan-500/40
                hover:bg-slate-800

                lg:flex-none
              "
            >
              <ArrowLeft
                size={14}
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-1
                "
              />

              Workspace
            </Link>

            <a
              href="/resume.pdf"
              download
              className="
                inline-flex
                h-10
                flex-1
                items-center
                justify-center
                gap-2

                rounded-lg

                bg-gradient-to-r
                from-cyan-500
                to-blue-600

                px-3

                text-xs
                font-semibold
                text-white

                transition-all
                duration-200

                hover:shadow-lg
                hover:shadow-cyan-500/20

                lg:flex-none
              "
            >
              <Download size={14} />

              Resume
            </a>

          </div>

        </div>

        {/* ===================================================== */}
        {/* FOOTER                                                */}
        {/* ===================================================== */}

        <div
          className="
            mt-5

            flex
            flex-col
            items-center
            justify-center
            gap-3

            border-t
            border-slate-700/60

            pt-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* Contact */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3.5

              text-xs
              text-slate-400
            "
          >
            <a
              href="mailto:your@email.com"
              className="transition hover:text-cyan-400"
            >
              Email
            </a>

            <span className="text-slate-700">
              •
            </span>

            <a
              href="https://github.com/gyaneshwar18"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-400"
            >
              GitHub
            </a>

            <span className="text-slate-700">
              •
            </span>

            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-400"
            >
              LinkedIn
            </a>
          </div>

          {/* Availability */}

          <div
            className="
              hidden

              sm:block

              w-fit

              rounded-full

              border
              border-cyan-500/20

              bg-cyan-500/10

              px-2.5
              py-1

              text-[10px]
              font-medium
              text-cyan-300
            "
          >
            Available for Full-Time Opportunities
          </div>

        </div>

      </div>
    </section>
  );
}