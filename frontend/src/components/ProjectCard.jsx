export default function ProjectCard({ title, problem, tech, impact }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">

      <h3 className="font-semibold text-lg mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        {problem}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map(t => (
          <span
            key={t}
            className="text-xs bg-gray-200 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Impact */}
      <p className="text-sm font-medium mb-4">
        Impact: {impact}
      </p>

      <div className="flex gap-3">
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
          Case Study
        </button>

        <button className="px-3 py-1 text-sm border rounded">
          GitHub
        </button>
      </div>

    </div>
  );
}
