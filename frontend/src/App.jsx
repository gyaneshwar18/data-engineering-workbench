import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SqlLab from "./pages/SqlLab";
import Pipelines from "./pages/Pipelines";
import Datasets from "./pages/Datasets";

import WorkbenchOverview from "./components/profile/WorkbenchOverview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Workbench */}
        <Route path="/workbench" element={<AppLayout />}>

          {/* Default Dashboard */}
          <Route index element={<Dashboard />} />

          <Route path="projects" element={<Projects />} />
          <Route path="sql-lab" element={<SqlLab />} />
          <Route path="pipelines" element={<Pipelines />} />
          <Route path="datasets" element={<Datasets />} />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />

          {/* About Workbench */}
          <Route path="about" element={<WorkbenchOverview />} />

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}