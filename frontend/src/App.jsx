import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SqlLab from "./pages/SqlLab";
import Pipelines from "./pages/Pipelines";
import Datasets from "./pages/Datasets";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔹 Public Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* 🔹 Workbench Layout (Main App) */}
        <Route path="/workbench" element={<AppLayout />}>

          {/* Default → Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Pages */}
          <Route path="projects" element={<Projects />} />
          <Route path="sql-lab" element={<SqlLab />} />
          <Route path="pipelines" element={<Pipelines />} />
          <Route path="datasets" element={<Datasets />} />

        </Route>

        {/* 🔹 Fallback Route (IMPORTANT) */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}