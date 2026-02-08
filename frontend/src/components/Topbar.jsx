export default function Topbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <div>
        <h2 className="font-semibold text-lg">
          Data Engineering Portfolio
        </h2>
        <p className="text-xs text-gray-500">
          SQL • Analytics • Pipelines
        </p>
      </div>

      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
        Recruiter Mode
      </button>

    </div>
  );
}
