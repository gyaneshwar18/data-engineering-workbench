import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Database,
  Workflow,
  GraduationCap,
  Mail,
  Table
} from "lucide-react";

export default function Sidebar() {

  const base =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition";

  const active =
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow";

  const idle =
    "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";

  return (
    <div className="
      w-64 p-6 flex flex-col
      bg-white/80 backdrop-blur
      border-r border-gray-200
      dark:bg-gray-900/80 dark:border-gray-800
    ">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          DE Workbench
        </h1>
        <p className="text-xs text-gray-500">
          Analytics Portfolio
        </p>
      </div>

      <nav className="space-y-2 text-sm">

        <NavLink to="/" end
          className={({ isActive }) =>
            `${base} ${isActive ? active : idle}`
          }>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink to="/projects"
          className={({ isActive }) =>
            `${base} ${isActive ? active : idle}`
          }>
          <FolderKanban size={18} /> Projects
        </NavLink>

        <NavLink to="/sql-lab"
          className={({ isActive }) =>
            `${base} ${isActive ? active : idle}`
          }>
          <Database size={18} /> SQL Lab
        </NavLink>

        <NavLink to="/pipelines"
          className={({ isActive }) =>
            `${base} ${isActive ? active : idle}`
          }>
          <Workflow size={18} /> Pipelines
        </NavLink>

        <NavLink to="/datasets"
          className={({ isActive }) =>
            `${base} ${isActive ? active : idle}`
          }>
          <Table size={18} /> Datasets
        </NavLink>

        <NavLink to="/education"
          className={({ isActive }) =>
            `${base} ${isActive ? active : idle}`
          }>
          <GraduationCap size={18} /> Education
        </NavLink>

        <NavLink to="/contact"
          className={({ isActive }) =>
            `${base} ${isActive ? active : idle}`
          }>
          <Mail size={18} /> Contact
        </NavLink>

      </nav>

      <div className="mt-auto text-xs text-gray-400 pt-8">
        v1 Portfolio
      </div>

    </div>
  );
}
