import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [performance, setPerformance] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const statsRes = await axios.get(`${API}/metrics/query-stats`);
      const perfRes = await axios.get(`${API}/metrics/query-performance`);

      setStats(statsRes.data);
      setPerformance(perfRes.data);

    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  if (!stats || !performance) {
    return <p className="text-white p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 text-white space-y-6">

      <h1 className="text-2xl font-bold">
        📊 Query Analytics Dashboard
      </h1>

      {/* 🔹 KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">

        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">Total Queries</p>
          <h2 className="text-xl font-bold">
            {stats.total_queries}
          </h2>
        </div>

        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">Successful</p>
          <h2 className="text-xl font-bold">
            {stats.successful_queries}
          </h2>
        </div>

        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">Avg Time</p>
          <h2 className="text-xl font-bold">
            {stats.avg_execution_time?.toFixed(3)} s
          </h2>
        </div>

        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">Success Rate</p>
          <h2 className="text-xl font-bold">
            {performance.success_rate?.toFixed(1)}%
          </h2>
        </div>

      </div>

      {/* 🔹 QUERIES PER DAY */}
      <div className="bg-gray-900 p-4 rounded">
        <h3 className="mb-3">Queries Per Day</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performance.queries_per_day}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 EXECUTION TREND */}
      <div className="bg-gray-900 p-4 rounded">
        <h3 className="mb-3">Execution Time Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performance.execution_trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="avg_time" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}