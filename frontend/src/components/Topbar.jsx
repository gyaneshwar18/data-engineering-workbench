import { useTheme } from "../context/ThemeContext";

export default function Topbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="
      px-8 py-5 flex justify-between items-center
      bg-white/80 backdrop-blur
      border-b border-gray-200
      dark:bg-gray-900/70 dark:border-gray-800
    ">

      <div>
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
          Data Engineering Portfolio
        </h2>
        <p className="text-xs text-gray-500">
          SQL • Analytics • Pipelines
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-sm rounded-xl border
          dark:border-gray-700 dark:text-gray-200"
        >
          {dark ? "Light" : "Dark"} Mode
        </button>

        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl">
          Recruiter Mode
        </button>

      </div>

    </div>
  );
}
