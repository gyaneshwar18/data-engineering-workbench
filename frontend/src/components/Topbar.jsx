export default function Topbar() {
  return (
    <div className="
      bg-white/80 backdrop-blur
      border-b border-gray-200
      px-8 py-5
      flex justify-between items-center
    ">

      <div>
        <h2 className="font-semibold text-xl text-gray-800">
          Data Engineering Portfolio
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          SQL • Analytics • Pipelines • Projects
        </p>
      </div>

      <button className="
        px-4 py-2 text-sm
        bg-blue-600 text-white
        rounded-xl
        hover:bg-blue-700
        transition
      ">
        Recruiter Mode
      </button>

    </div>
  );
}
