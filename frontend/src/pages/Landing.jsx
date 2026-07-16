import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-gray-50
        via-white
        to-gray-100
        dark:from-[#09090B]
        dark:via-[#0f0f11]
        dark:to-[#111113]
        flex
        flex-col
        justify-center
        items-center
        px-6
        text-center
      "
    >
      {/* Name */}

      <h1
        className="
          text-5xl
          font-bold
          tracking-tight
          text-gray-900
          dark:text-white
        "
      >
        Gyaneshwar Suryavanshi
      </h1>

      {/* Role */}

      <p
        className="
          mt-5
          max-w-2xl
          text-lg
          leading-8
          text-gray-600
          dark:text-slate-400
        "
      >
        Data Engineering & SQL Specialist building analytics
        platforms, ETL pipelines, and dashboard-driven insights.
      </p>

      {/* Skills */}

      <div className="mt-10 flex flex-wrap justify-center gap-3">

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
              rounded-xl
              border
              border-gray-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              dark:text-slate-300
            "
          >
            {skill}
          </span>
        ))}

      </div>

      {/* Buttons */}

      <div className="mt-12 flex flex-wrap justify-center gap-4">

        <Link
          to="/workbench"
          className="
            rounded-2xl
            bg-blue-600
            px-7
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-blue-500
          "
        >
          Launch Workspace →
        </Link>

        <Link
          to="/profile"
          className="
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            px-7
            py-3
            text-sm
            font-semibold
            text-slate-200
            transition-all
            duration-200
            hover:border-blue-500
            hover:text-white
          "
        >
          My Profile →
        </Link>

      </div>

      {/* Footer */}

      <div className="mt-20 text-sm text-slate-500">
        Built with React • FastAPI • PostgreSQL
      </div>

    </div>
  );
}