import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  BriefcaseBusiness,
  Copy,
} from "lucide-react";

export default function ContactCard() {
  const email = "suryavanshigyaneshwar@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      console.error(error);
    }
  };

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
            border-emerald-500/20
            bg-emerald-500/10
          "
        >
          <Mail
            size={20}
            className="text-emerald-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            Contact
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Professional contact information
          </p>

        </div>

      </div>

      {/* Content */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {/* Email */}

        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/60
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  border
                  border-blue-500/20
                "
              >
                <Mail
                  size={18}
                  className="text-blue-400"
                />
              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {email}
                </p>

              </div>

            </div>

            <button
              onClick={copyEmail}
              className="
                rounded-lg
                border
                border-slate-700
                p-2
                text-slate-400
                transition-all
                hover:border-blue-500
                hover:text-white
              "
            >
              <Copy size={16} />
            </button>

          </div>

        </div>

        {/* GitHub */}

        <a
          href="https://github.com/gyaneshwar18"
          target="_blank"
          rel="noreferrer"
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

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-10
                w-10
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

            <div>

              <p className="text-xs text-slate-500">
                GitHub
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                github.com/gyaneshwar18
              </p>

            </div>

          </div>

        </a>

        {/* LinkedIn */}

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
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

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                border
                border-blue-500/20
                "
              >
                <Linkedin
                  size={18}
                  className="text-blue-400"
                />
            </div>

            <div>

              <p className="text-xs text-slate-500">
                LinkedIn
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                linkedin.com/in/your-profile
              </p>

            </div>

          </div>

        </a>

        {/* Location */}

        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/60
            p-5
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                border
                border-emerald-500/20
              "
            >
              <MapPin
                size={18}
                className="text-emerald-400"
              />
            </div>

            <div>

              <p className="text-xs text-slate-500">
                Location
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                Hyderabad, Telangana, India
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Availability */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          p-5
        "
      >

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/20
              "
            >
              <BriefcaseBusiness
                size={20}
                className="text-emerald-400"
              />
            </div>

            <div>

              <h3 className="font-semibold text-white">
                Open to Data Engineering Opportunities
              </h3>

              <p className="mt-1 text-sm text-emerald-300">
                Available for Full-time • Internship • Entry-level Roles
              </p>

            </div>

          </div>

          <a
            href={`mailto:${email}`}
            className="
              rounded-xl
              bg-emerald-500
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              transition-all
              hover:bg-emerald-400
            "
          >
            Get in Touch
          </a>

        </div>

      </div>

    </section>
  );
}