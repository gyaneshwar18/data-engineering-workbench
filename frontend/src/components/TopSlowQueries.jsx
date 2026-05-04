import { useEffect, useState } from "react";
import { getTopSlowQueries } from "../api/dashboardApi";

export default function TopSlowQueries() {

  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const data = await getTopSlowQueries();
      setQueries(data);
    } catch (err) {
      console.error("Top slow queries error:", err);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl">

      <h2 className="text-lg font-bold mb-4">
        Top Slow Queries
      </h2>

      <table className="w-full text-sm">

        <thead>
          <tr className="border-b border-gray-700 text-left">
            <th className="py-2">Query</th>
            <th>Avg Time</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {queries.map((q, index) => (
            <tr
              key={index}
              className="border-b border-gray-800"
            >
              <td className="py-2">
                <div className="max-w-[400px] truncate">
                  {q.query}
                </div>
              </td>

              <td>{q.avg_time}s</td>

              <td>{q.count}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}