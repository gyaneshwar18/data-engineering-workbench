import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Database,
  Workflow,
  GraduationCap,
  Mail
} from "lucide-react";

export default function Sidebar() {
  const base = "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800";
  const active = "bg-gray-800 text-blue-400";

  return (
    <div className="w-64 bg-gray-900 text-gray-200 p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-8">DE Workbench</h1>

      <nav className="space-y-2 text-sm">

        <NavLink to="/" end className={({isActive}) => `${base} ${isActive?active:""}`}>
          <LayoutDashboard size={18}/> Dashboard
        </NavLink>

        <NavLink to="/projects" className={({isActive}) => `${base} ${isActive?active:""}`}>
          <FolderKanban size={18}/> Projects
        </NavLink>

        <NavLink to="/sql-lab" className={({isActive}) => `${base} ${isActive?active:""}`}>
          <Database size={18}/> SQL Lab
        </NavLink>

        <NavLink to="/pipelines" className={({isActive}) => `${base} ${isActive?active:""}`}>
          <Workflow size={18}/> Pipelines
        </NavLink>

        <NavLink to="/education" className={({isActive}) => `${base} ${isActive?active:""}`}>
          <GraduationCap size={18}/> Education
        </NavLink>

        <NavLink to="/contact" className={({isActive}) => `${base} ${isActive?active:""}`}>
          <Mail size={18}/> Contact
        </NavLink>

      </nav>

      <div className="mt-auto text-xs text-gray-500">
        Portfolio UI v1
      </div>
    </div>
  );
}
