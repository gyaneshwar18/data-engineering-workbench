import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function QueryHistoryPanel({ onRunAgain }) {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Fetch history
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8000/sql-lab/history");
      setHistory(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  // Filter + Search Logic
  useEffect(() => {
    let data = [...history];

    if (filter !== "all") {
      data = data.filter((q) => q.status === filter);
    }

    if (search) {
      data = data.filter((q) =>
        q.query.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [filter, search, history]);

  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-lg mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-white">
          Query History
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search queries..."
          className="px-3 py-2 rounded bg-gray-800 text-white w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter */}
        <select
          className="px-3 py-2 rounded bg-gray-800 text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-2">Query</th>
              <th>Time (s)</th>
              <th>Status</th>
              <th>Run</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((q) => (
              <motion.tr
                key={q.id}
                className="border-b border-gray-800 hover:bg-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="py-2 max-w-xs truncate">
                  {q.query}
                </td>

                <td>{q.execution_time}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      q.status === "success"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {q.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => onRunAgain(q.query)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
                  >
                    Run Again
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          No queries found
        </p>
      )}
    </div>
  );
}