export default function SqlQueryList({ queries, onSelect, selectedId }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">

      <h3 className="font-semibold text-white mb-2">
        Queries
      </h3>

      {queries.map(q => (
        <button
          key={q.id}
          onClick={() => onSelect(q)}
          className={`w-full text-left p-3 rounded-lg transition border
            ${
              selectedId === q.id
                ? "bg-blue-600/20 border-blue-500 text-white"
                : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
            }
          `}
        >
          <div className="font-medium text-sm">
            {q.title}
          </div>

          <div className="text-xs text-gray-400">
            {q.category}
          </div>
        </button>
      ))}

    </div>
  );
}