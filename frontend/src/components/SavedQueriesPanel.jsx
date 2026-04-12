import { useEffect, useState } from "react";
import axios from "axios";

export default function SavedQueriesPanel({ onSelect }) {

  const [queries, setQueries] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;

  // 🔄 Fetch saved queries
  const fetchSaved = async () => {
    try {
      const res = await axios.get(`${API}/sql-lab/saved`);
      console.log("Saved Queries:", res.data); // 🔍 DEBUG
      setQueries(res.data);
    } catch (err) {
      console.error("Error fetching saved queries", err);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <div className="bg-gray-900 p-5 rounded-xl mt-6">

      <h2 className="text-white font-semibold mb-3">
        ⭐ Saved Queries
      </h2>

      {queries.length === 0 && (
        <p className="text-gray-400 text-sm">
          No saved queries yet
        </p>
      )}

      {queries.map((q) => (
        <div
          key={q.id}
          className="bg-gray-800 p-3 rounded mb-2 cursor-pointer hover:bg-gray-700 text-sm text-gray-200"
          onClick={() => onSelect(q.query)}
        >
          {q.query}
        </div>
      ))}

    </div>
  );
}