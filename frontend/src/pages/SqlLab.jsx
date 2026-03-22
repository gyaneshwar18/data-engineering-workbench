import { useState, useEffect } from "react";
import axios from "axios";
import QueryHistoryPanel from "../components/QueryHistoryPanel";
import SqlQueryList from "../components/SqlQueryList";
import SqlCodeBlock from "../components/SqlCodeBlock";
import ResultTable from "../components/ResultTable";
import ChartRenderer from "../components/ChartRenderer";

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
LIMIT 5;`,
    explanation: "Groups orders and finds highest revenue customers"
  },
  {
    id: 2,
    title: "Rank Employees by Salary",
    category: "Window Function",
    difficulty: "Hard",
    sql: `SELECT name, salary,
RANK() OVER (ORDER BY salary DESC) rnk
FROM employees;`,
    explanation: "Uses window function ranking"
  }
];

export default function SqlLab() {

  const [selected, setSelected] = useState(QUERIES[0]);
  const [sqlQuery, setSqlQuery] = useState(QUERIES[0].sql);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Run query
  const runQuery = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/sql-lab/run`,
        { query: sqlQuery }
      );

      setResult(res.data);

    } catch (err) {
      console.error("SQL execution error:", err);
      alert(err.response?.data?.detail || "Query execution failed");
    } finally {
      setLoading(false);
    }
  };

  // Run Again
  const handleRunAgain = (query) => {
    setSqlQuery(query);
    setResult(null);
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        SQL Lab — Query Showcase
      </h1>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="col-span-3">
          <SqlQueryList
            queries={QUERIES}
            onSelect={(q) => {
              setSelected(q);
              setSqlQuery(q.sql);
              setResult(null);
            }}
            selectedId={selected.id}
          />
        </div>

        {/* RIGHT */}
        <div className="col-span-9 space-y-6">

          {/* Header */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <div className="flex justify-between items-center">

              <div>
                <h2 className="font-semibold text-lg text-white">
                  {selected.title}
                </h2>
                <p className="text-sm text-gray-400">
                  {selected.category}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded font-medium
                  ${
                    selected.difficulty === "Easy"
                      ? "bg-green-600/20 text-green-400"
                      : selected.difficulty === "Medium"
                      ? "bg-yellow-600/20 text-yellow-400"
                      : "bg-red-600/20 text-red-400"
                  }
                `}
              >
                {selected.difficulty}
              </span>

            </div>
          </div>

          {/* SQL Editor */}
          <SqlCodeBlock code={sqlQuery} onChange={setSqlQuery} />

          {/* Run */}
          <button
            onClick={runQuery}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg text-white"
          >
            {loading ? "Running..." : "Run Query"}
          </button>

          {/* Explanation */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <h3 className="font-semibold mb-2 text-white">
              Explanation
            </h3>

            <p className="text-sm text-gray-400">
              {selected.explanation}
            </p>
          </div>

          {/* RESULT + CHART */}
          {result && (
            <>
              <ResultTable
                columns={result.columns}
                rows={result.rows}
              />

              <ChartRenderer
                columns={result.columns}
                rows={result.rows}
              />
            </>
          )}

          {/* HISTORY */}
          <QueryHistoryPanel onRunAgain={handleRunAgain} />

        </div>
      </div>
    </div>
  );
}