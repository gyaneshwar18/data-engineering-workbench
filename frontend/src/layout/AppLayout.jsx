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
        <main className="flex-1 overflow-y-auto bg-linear-to-br from-gray-100 to-gray-200 p-8">

          {children}
        </main>

      </div>
    </div>
  );
}
