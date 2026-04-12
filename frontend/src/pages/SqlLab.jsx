import { useState } from "react";
import axios from "axios";
import QueryHistoryPanel from "../components/QueryHistoryPanel";
import SqlQueryList from "../components/SqlQueryList";
import SqlCodeBlock from "../components/SqlCodeBlock";
import ResultTable from "../components/ResultTable";
import ChartRenderer from "../components/ChartRenderer";
import SavedQueriesPanel from "../components/SavedQueriesPanel";

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

  // ⭐ NEW STATE
  const [chartType, setChartType] = useState("auto");

  const API = import.meta.env.VITE_API_BASE_URL;

  const runQuery = async () => {
    console.log("Query:", sqlQuery);

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

  const saveQuery = async () => {
    try {
      await axios.post(`${API}/sql-lab/save`, {
        query: sqlQuery
      });

      alert("Saved ⭐");

    } catch {
      alert("Save failed");
    }
  };

  const handleRunAgain = (query) => {
    setSqlQuery(query);
    setResult(null);
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-white">
        SQL Lab
      </h1>

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

          <SqlCodeBlock code={sqlQuery} onChange={setSqlQuery} />

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button onClick={runQuery} className="bg-blue-600 px-6 py-2 rounded text-white">
              {loading ? "Running..." : "Run Query"}
            </button>

            <button onClick={saveQuery} className="bg-yellow-600 px-6 py-2 rounded text-white">
              ⭐ Save
            </button>
          </div>

          {/* ⭐ CHART SELECTOR */}
          <div className="flex gap-3">
            <button onClick={() => setChartType("auto")} className="bg-gray-700 px-3 py-1 rounded text-white text-sm">
              Auto
            </button>
            <button onClick={() => setChartType("bar")} className="bg-blue-600 px-3 py-1 rounded text-white text-sm">
              Bar
            </button>
            <button onClick={() => setChartType("line")} className="bg-green-600 px-3 py-1 rounded text-white text-sm">
              Line
            </button>
            <button onClick={() => setChartType("none")} className="bg-red-600 px-3 py-1 rounded text-white text-sm">
              Table Only
            </button>
          </div>

          {/* RESULT */}
          {result && (
            <>
              <ResultTable columns={result.columns} rows={result.rows} />

              <ChartRenderer
                columns={result.columns}
                rows={result.rows}
                chartType={chartType}
              />
            </>
          )}

          <QueryHistoryPanel onRunAgain={handleRunAgain} />
          <SavedQueriesPanel onSelect={setSqlQuery} />

        </div>
      </div>
    </div>
  );
}