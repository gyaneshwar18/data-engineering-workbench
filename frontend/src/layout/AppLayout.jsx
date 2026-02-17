import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen w-full">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation */}
        <Topbar />

        {/* Main Content */}
        <main className="
  flex-1 overflow-y-auto p-8
  bg-linear-to-br from-gray-100 to-gray-200
  dark:from-gray-950 dark:to-gray-900
">

          {children}
        </main>

      </div>
    </div>
  );
}
