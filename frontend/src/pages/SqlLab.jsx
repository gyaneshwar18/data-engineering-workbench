import { useState } from "react";
import axios from "axios";

import SqlQueryList from "../components/SqlQueryList";
import SqlCodeBlock from "../components/SqlCodeBlock";
import ResultTable from "../components/ResultTable";

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

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runQuery = async () => {

    setLoading(true);

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/sql-lab/run`,
        { query: selected.sql }
      );

      setResult(res.data);

    } catch (err) {

      console.error("SQL execution error:", err);
      alert("Query execution failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        SQL Lab — Query Showcase
      </h1>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT — Query List */}
        <div className="col-span-4">
          <SqlQueryList
            queries={QUERIES}
            onSelect={(q) => {
              setSelected(q);
              setResult(null);
            }}
            selectedId={selected.id}
          />
        </div>

        {/* RIGHT — Query Details */}
        <div className="col-span-8 space-y-4">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-lg">
              {selected.title}
            </h2>

            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {selected.difficulty}
            </span>

          </div>

          {/* SQL Code */}
          <SqlCodeBlock code={selected.sql} />

          {/* Run Button */}
          <button
            onClick={runQuery}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Running..." : "Run Query"}
          </button>

          {/* Explanation */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-2">
              Explanation
            </h3>

            <p className="text-sm text-gray-600">
              {selected.explanation}
            </p>

          </div>

          {/* Results */}
          {result && (
            <ResultTable
              columns={result.columns}
              rows={result.rows}
            />
          )}

        </div>

      </div>

    </div>
  );
}