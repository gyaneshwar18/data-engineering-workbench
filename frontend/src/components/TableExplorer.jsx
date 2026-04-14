import { useEffect, useState } from "react";
import axios from "axios";
import ResultTable from "./ResultTable";

export default function TableExplorer({ onSelectTable }) {

  const [tables, setTables] = useState([]);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState(null);
  const [schema, setSchema] = useState([]); // ✅ NEW

  const API = import.meta.env.VITE_API_BASE_URL;

  // 🔹 Fetch all tables
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await axios.get(`${API}/sql-lab/tables`);
      console.log("Tables:", res.data);
      setTables(res.data);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  // 🔹 Load table preview + schema + auto query
  const loadTable = async (table) => {
    setSelected(table);

    // ✅ Auto-fill SQL editor
    if (onSelectTable) {
      onSelectTable(`SELECT * FROM ${table};`);
    }

    try {
      // 🔹 Fetch table data
      const res = await axios.get(`${API}/sql-lab/table/${table}`);
      console.log("Table data:", res.data);
      setData(res.data);

      // 🔹 Fetch schema
      const schemaRes = await axios.get(`${API}/sql-lab/schema/${table}`);
      console.log("Schema:", schemaRes.data);
      setSchema(schemaRes.data);

    } catch (err) {
      console.error("Error loading table:", err);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl mt-6">

      <h2 className="text-white font-semibold mb-3">
        📦 Table Explorer
      </h2>

      {/* TABLE LIST */}
      <div className="flex gap-2 flex-wrap mb-4">
        {tables.map((t) => (
          <button
            key={t}
            onClick={() => loadTable(t)}
            className={`px-3 py-1 rounded text-sm ${
              selected === t
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TABLE DATA */}
      {data && (
        <ResultTable
          columns={data.columns}
          rows={data.rows}
        />
      )}

      {/* 🔥 SCHEMA VIEWER */}
      {schema.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-2">
            🧠 Schema
          </h3>

          <div className="bg-gray-800 p-3 rounded">
            {schema.map((col, i) => (
              <div
                key={i}
                className="flex justify-between text-sm text-gray-300 border-b border-gray-700 py-1"
              >
                <span>{col.column}</span>
                <span className="text-gray-400">{col.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}