import { useState } from "react";
import SqlQueryList from "../components/SqlQueryList";
import SqlCodeBlock from "../components/SqlCodeBlock";
import ResultTable from "../components/ResultTable";

const MOCK_QUERIES = [
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
    explanation: "Groups orders and finds highest revenue customers",
    columns: ["customer_id", "total"],
    rows: [
      { customer_id: 101, total: 9200 },
      { customer_id: 203, total: 8700 }
    ]
  },
  {
    id: 2,
    title: "Rank Employees by Salary",
    category: "Window Function",
    difficulty: "Hard",
    sql: `SELECT name, salary,
RANK() OVER (ORDER BY salary DESC) rnk
FROM employees;`,
    explanation: "Uses window function ranking",
    columns: ["name", "salary", "rnk"],
    rows: [
      { name: "A", salary: 90000, rnk: 1 },
      { name: "B", salary: 85000, rnk: 2 }
    ]
  }
];

export default function SqlLab() {
  const [selected, setSelected] = useState(MOCK_QUERIES[0]);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        SQL Lab — Query Showcase
      </h1>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT — query list */}
        <div className="col-span-4">
          <SqlQueryList
            queries={MOCK_QUERIES}
            onSelect={setSelected}
            selectedId={selected.id}
          />
        </div>

        {/* RIGHT — detail */}
        <div className="col-span-8 space-y-4">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-lg">
              {selected.title}
            </h2>

            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {selected.difficulty}
            </span>

          </div>

          <SqlCodeBlock code={selected.sql} />

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">
              Explanation
            </h3>
            <p className="text-sm text-gray-600">
              {selected.explanation}
            </p>
          </div>

          <ResultTable
            columns={selected.columns}
            rows={selected.rows}
          />

        </div>

      </div>

    </div>
  );
}
