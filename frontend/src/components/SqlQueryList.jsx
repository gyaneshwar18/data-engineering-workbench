export default function SqlQueryList({ queries, onSelect, selectedId }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">

      <h3 className="font-semibold mb-3">
        Queries
      </h3>

      {queries.map(q => (
        <button
          key={q.id}
          onClick={() => onSelect(q)}
          className={`w-full text-left p-3 rounded-lg border
            ${selectedId === q.id ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"}
          `}
        >
          <div className="font-medium text-sm">
            {q.title}
          </div>
          <div className="text-xs text-gray-500">
            {q.category}
          </div>
        </button>
      ))}

    </div>
  );
}
