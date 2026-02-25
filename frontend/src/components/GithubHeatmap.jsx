export default function GithubHeatmap() {
  return (
    <div
      className="               
        rounded-2xl p-6
        border border-gray-200 dark:border-gray-800
        bg-white shadow-sm
        dark:bg-gray-900
      "
    >
      <h3 className="text-gray-800 dark:text-gray-100 font-semibold tracking-tight mb-4">
        GitHub Contributions
      </h3>

      <div className="overflow-x-auto">
        <img
          src="https://ghchart.rshah.org/gyaneshwar18"
          alt="GitHub heatmap"
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}