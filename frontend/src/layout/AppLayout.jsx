import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  function toggleSidebar() {
    setSidebarExpanded((current) => !current);
  }

  function collapseSidebar() {
    setSidebarExpanded(false);
  }

  return (
    <div className="flex h-screen w-full min-w-0 overflow-hidden">
      {/* ========================================================= */}
      {/* SIDEBAR                                                   */}
      {/* ========================================================= */}

      <Sidebar
        expanded={sidebarExpanded}
        onToggle={toggleSidebar}
        onNavigate={collapseSidebar}
      />

      {/* ========================================================= */}
      {/* APPLICATION AREA                                          */}
      {/* ========================================================= */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ======================================================= */}
        {/* TOPBAR                                                   */}
        {/* ======================================================= */}

        <Topbar
          sidebarExpanded={sidebarExpanded}
          onMenuToggle={toggleSidebar}
        />

        {/* ======================================================= */}
        {/* MAIN CONTENT                                              */}
        {/* ======================================================= */}

        <main
          className="
            min-w-0
            flex-1
            overflow-x-hidden
            overflow-y-auto

            p-4
            sm:p-5
            md:p-6
            lg:p-8

            bg-linear-to-br
            from-gray-100
            to-gray-200

            dark:from-gray-950
            dark:to-gray-900
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}