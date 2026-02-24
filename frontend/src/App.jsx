import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Datasets from "./pages/Datasets";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SqlLab from "./pages/SqlLab";
import Pipelines from "./pages/Pipelines";
import Education from "./pages/Education";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sql-lab" element={<SqlLab />} />
          <Route path="/pipelines" element={<Pipelines />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/datasets" element={<Datasets />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
