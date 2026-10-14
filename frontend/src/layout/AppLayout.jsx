import { useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main) return undefined;

    const scrollToTop = () => {
      main.scrollTop = 0;
      main.scrollLeft = 0;
    };

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [location.key]);

  function toggleSidebar() {
    setSidebarExpanded((current) => !current);
  }

  function collapseSidebar() {
    setSidebarExpanded(false);
  }

  return (
    <div className="dark flex h-screen w-full min-w-0 overflow-hidden">
      {/* Navigation */}
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={toggleSidebar}
        onNavigate={collapseSidebar}
      />

      {/* Application area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          sidebarExpanded={sidebarExpanded}
          onMenuToggle={toggleSidebar}
        />

        <main
          ref={mainRef}
          className="
            min-w-0
            flex-1
            overflow-x-hidden
            overflow-y-auto

            bg-linear-to-br
            from-gray-100
            to-gray-200
            dark:from-gray-950
            dark:to-gray-900

            p-4
            sm:p-5
            md:p-6
            lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
