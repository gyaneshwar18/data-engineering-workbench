export default function DatasetHeader({ onUpload }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Datasets
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Explore and manage all your datasets
        </p>
      </div>

      <button
        onClick={onUpload}
        className="
          inline-flex items-center gap-2
          rounded-lg
          border border-blue-500/30
          bg-blue-600
          px-4 py-2
          text-sm font-medium
          text-white
          transition
          hover:bg-blue-500
        "
      >
        <span className="text-base">+</span>
        Upload Dataset
      </button>
    </div>
  );
}