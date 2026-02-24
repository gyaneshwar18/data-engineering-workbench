import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="
      min-h-screen
      bg-gradient-to-br from-gray-50 to-gray-200
      dark:from-gray-950 dark:to-gray-900
      flex flex-col justify-center items-center
      px-6 text-center
    ">

      {/* Name + Role */}
      <h1 className="
        text-4xl md:text-5xl font-bold
        text-gray-900 dark:text-gray-100
        tracking-tight
      ">
        Gyaneshwar Suryavanshi
      </h1>

      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
        Data Engineering & SQL Specialist building analytics platforms,
        ETL pipelines, and dashboard-driven insights.
      </p>

      {/* Skills Strip */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        {[
          "SQL",
          "PostgreSQL",
          "Python",
          "ETL",
          "Data Profiling",
          "React"
        ].map(skill => (
          <span
            key={skill}
            className="
              px-4 py-2 rounded-xl
              bg-white/80 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
            "
          >
            {skill}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="mt-10 flex gap-4 flex-wrap justify-center">

        <Link
          to="/workbench"
          className="
            px-6 py-3 bg-blue-600 text-white
            rounded-2xl hover:bg-blue-700 transition
          "
        >
          Explore Workbench →
        </Link>

        <a
          href="#"
          className="
            px-6 py-3 border rounded-2xl
            dark:border-gray-700 dark:text-gray-200
          "
        >
          Download Resume
        </a>

      </div>

      {/* Footer */}
      <div className="mt-16 text-sm text-gray-500">
        © 2025 Data Engineering Portfolio
      </div>

    </div>
  );
}