import {
  Github,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function ProfileActions() {
  return (
    <div>

      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Quick Links
      </h3>

      <div className="space-y-3">

        {/* GitHub */}

        <a
          href="https://github.com/gyaneshwar18"
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            justify-between

            rounded-xl

            border
            border-slate-800

            bg-slate-800/40

            px-4
            py-3

            hover:border-slate-700
            hover:bg-slate-800

            transition-all
            duration-300
          "
        >

          <div className="flex items-center gap-3">

            <Github
              size={20}
              className="text-white"
            />

            <span className="text-slate-200 font-medium">
              View GitHub
            </span>

          </div>

          <ExternalLink
            size={16}
            className="text-slate-500"
          />

        </a>

        {/* Resume */}

        <a
          href="/resume.pdf"
          target="_blank"
          className="
            flex
            items-center
            justify-between

            rounded-xl

            border
            border-slate-800

            bg-slate-800/40

            px-4
            py-3

            hover:border-slate-700
            hover:bg-slate-800

            transition-all
            duration-300
          "
        >

          <div className="flex items-center gap-3">

            <FileText
              size={20}
              className="text-blue-400"
            />

            <span className="text-slate-200 font-medium">
              Download Resume
            </span>

          </div>

          <ExternalLink
            size={16}
            className="text-slate-500"
          />

        </a>

      </div>

    </div>
  );
}