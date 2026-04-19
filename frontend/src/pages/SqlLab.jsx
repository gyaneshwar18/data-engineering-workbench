import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QueryHistoryPanel from "../components/QueryHistoryPanel";
import SqlQueryList from "../components/SqlQueryList";
import SqlCodeBlock from "../components/SqlCodeBlock";
import ResultTable from "../components/ResultTable";
import ChartRenderer from "../components/ChartRenderer";
import SavedQueriesPanel from "../components/SavedQueriesPanel";
import TableExplorer from "../components/TableExplorer";

const QUERIES = [
  {
    id: 1,
    title: "Top Customers by Revenue",
    category: "Aggregation",
    difficulty: "Medium",
    sql: `SELECT customer_id, SUM(amount) total
FROM orders
GROUP BY customer_id
ORDER BY total DESC
LIMIT 5;`
  },
  {
    id: 2,
    title: "Rank Employees by Salary",
    category: "Window Function",
    difficulty: "Hard",
    sql: `SELECT name, salary,
RANK() OVER (ORDER BY salary DESC) rnk
FROM employees;`
  }
];

export default function SqlLab() {

  const [selected, setSelected] = useState(QUERIES[0]);
  const [sqlQuery, setSqlQuery] = useState(QUERIES[0].sql);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState("auto");
  const [uploadedTable, setUploadedTable] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [allColumns, setAllColumns] = useState({});

  const API = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // 🔹 FETCH METADATA
  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    try {
      const tablesRes = await axios.get(`${API}/sql-lab/tables`);
      setAllTables(tablesRes.data);

      const cols = {};
      for (let table of tablesRes.data) {
        const res = await axios.get(`${API}/sql-lab/schema/${table}`);
        cols[table] = res.data.map(c => c.column);
      }

      setAllColumns(cols);

    } catch (err) {
      console.error("Metadata error", err);
    }
  };

  // 🔹 RUN QUERY
  const runQuery = async () => {
    if (!sqlQuery.trim()) {
      alert("Query is empty");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API}/sql-lab/run`, {
        query: sqlQuery
      });

      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Execution failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 SAVE QUERY
  const saveQuery = async () => {
    try {
      await axios.post(`${API}/sql-lab/save`, { query: sqlQuery });
      alert("Saved ⭐");
    } catch {
      alert("Save failed");
    }
  };

  // 🔹 RUN AGAIN
  const handleRunAgain = (query) => {
    setSqlQuery(query);
    setResult(null);
  };

  // 🔹 EXPORT CSV
  const exportCSV = () => {
    if (!result || result.rows.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = result.columns.join(",");
    const rows = result.rows.map(row =>
      result.columns.map(col => row[col]).join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "query_result.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  // 🔹 UPLOAD CSV
  const uploadCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API}/sql-lab/upload`, formData);

      const tableName = file.name.replace(".csv", "").toLowerCase();
      setUploadedTable(tableName);

      console.log(res.data.message);
      e.target.value = null;

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Upload failed");
    }
  };

  // 🔥 AUTOCOMPLETE ENGINE (IMPROVED)
  const handleEditorChange = (value) => {
    setSqlQuery(value);

    const words = value.trim().split(/\s+/);
    const lastWord = words[words.length - 1]?.toLowerCase() || "";

    let matches = [];

    if (lastWord.length > 0) {
      const tableMatches = allTables.filter(t =>
        t.toLowerCase().startsWith(lastWord)
      );

      const columnMatches = Object.values(allColumns)
        .flat()
        .filter(c => c.toLowerCase().startsWith(lastWord));

      // ✅ Remove duplicates
      matches = [...new Set([...tableMatches, ...columnMatches])];

    } else {
      matches = allTables;
    }

    setSuggestions(matches.slice(0, 5));
  };

  // 🔥 REPLACE WORD (IMPORTANT FIX)
  const insertSuggestion = (suggestion) => {
    const words = sqlQuery.trim().split(/\s+/);
    words.pop(); // remove last word
    const newQuery = [...words, suggestion].join(" ") + " ";

    setSqlQuery(newQuery);
    setSuggestions([]);
  };

 

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold text-white">
          SQL Lab
        </h1>

        <button
          onClick={() => navigate("/workbench")}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
        >
          📊 Dashboard
        </button>

      </div>
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="col-span-3">
          <SqlQueryList
            queries={QUERIES}
            selectedId={selected.id}
            onSelect={(q) => {
              setSelected(q);
              setSqlQuery(q.sql);
              setResult(null);
            }}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-9 space-y-6">

          <div className="bg-gray-900 border p-4 rounded-xl">
            <h2 className="text-white font-semibold">
              {selected.title}
            </h2>
          </div>

          {/* SQL EDITOR */}
          <SqlCodeBlock code={sqlQuery} onChange={handleEditorChange} />

          {/* AUTOCOMPLETE */}
          {suggestions.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded mt-2 p-2">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => insertSuggestion(s)}
                  className="text-sm text-white px-2 py-1 hover:bg-gray-700 cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          )}

          {/* UPLOAD */}
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Upload Dataset</p>

            <label className="bg-purple-600 px-4 py-2 rounded text-white cursor-pointer inline-block">
              Upload CSV
              <input
                type="file"
                accept=".csv"
                onChange={uploadCSV}
                className="hidden"
              />
            </label>

            {uploadedTable && (
              <p className="text-green-400 text-sm mt-3">
                Table "{uploadedTable}" ready ✅
              </p>
            )}
          </div>

          <TableExplorer onSelectTable={setSqlQuery} />

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button onClick={runQuery} className="bg-blue-600 px-6 py-2 rounded text-white">
              {loading ? "Running..." : "Run Query"}
            </button>

            <button onClick={saveQuery} className="bg-yellow-600 px-6 py-2 rounded text-white">
              ⭐ Save
            </button>

            <button onClick={exportCSV} className="bg-green-600 px-6 py-2 rounded text-white">
              ⬇ Export CSV
            </button>
          </div>

          {/* CHART */}
          {result && (
            <>
              <ResultTable columns={result.columns} rows={result.rows} />
              <ChartRenderer columns={result.columns} rows={result.rows} chartType={chartType} />
            </>
          )}

          <QueryHistoryPanel onRunAgain={handleRunAgain} />
          <SavedQueriesPanel onSelect={setSqlQuery} />

        </div>
      </div>
    </div>
  );
}