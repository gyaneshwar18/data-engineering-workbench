import { useEffect, useState } from "react";
import axios from "axios";

export default function SavedQueriesPanel({ onSelect }) {

  const [queries, setQueries] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;

  const fetchSaved = async () => {
    const res = await axios.get(`${API}/sql-lab/saved`);
    setQueries(res.data);
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  // 🗑 DELETE
  const deleteQuery = async (id) => {
    await axios.delete(`${API}/sql-lab/saved/${id}`);
    fetchSaved();
  };

  // 📌 PIN
  const togglePin = async (id) => {
    await axios.put(`${API}/sql-lab/saved/${id}/pin`);
    fetchSaved();
  };

  return (
    <div className="bg-gray-900 p-5 rounded-xl mt-6">

      <h2 className="text-white font-semibold mb-3">
        ⭐ Saved Queries
      </h2>

      {queries.map((q) => (
        <div
          key={q.id}
          className={`p-3 rounded mb-2 ${
            q.is_pinned ? "bg-yellow-900" : "bg-gray-800"
          }`}
        >

          <div
            className="cursor-pointer text-sm text-gray-200 mb-2"
            onClick={() => onSelect(q.query)}
          >
            {q.query}
          </div>

          <div className="flex gap-2 text-xs">

            <button
              onClick={() => togglePin(q.id)}
              className="bg-yellow-600 px-2 py-1 rounded text-white"
            >
              {q.is_pinned ? "Unpin" : "Pin"}
            </button>

            <button
              onClick={() => deleteQuery(q.id)}
              className="bg-red-600 px-2 py-1 rounded text-white"
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}