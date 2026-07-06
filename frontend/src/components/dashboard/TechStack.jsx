const technologies = [
  "Python",
  "SQL",
  "PostgreSQL",
  "FastAPI",
  "React",
  "Airflow",
  "dbt",
  "AWS",
  "Docker",
  "Git",
];

export default function TechStack() {
  return (
    <div>

      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Tech Stack
      </h3>

      <div className="flex flex-wrap gap-2">

        {technologies.map((tech) => (

          <span
            key={tech}
            className="
              rounded-full
              border
              border-slate-700
              bg-slate-800/60
              px-3
              py-1.5
              text-xs
              font-medium
              text-slate-200
              hover:bg-slate-700
              hover:border-slate-600
              transition-all
              duration-200
            "
          >
            {tech}
          </span>

        ))}

      </div>

    </div>
  );
}