import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full min-w-0 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Top Navigation */}
        <Topbar />

        {/* Main Content */}
        <main
          className="
            min-w-0
            flex-1
            overflow-x-hidden
            overflow-y-auto
            p-8

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