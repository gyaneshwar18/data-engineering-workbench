export default function UploadDatasetDialog({
  open,
  onClose,
  onUpload,
  uploading = false,
}) {
  if (!open) return null;

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onUpload(file);

    event.target.value = "";
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        px-4
        backdrop-blur-sm
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-2xl
          border border-slate-700/80
          bg-slate-900
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-white">
              Upload Dataset
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Upload a CSV file to create a new dataset.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              text-lg
              text-slate-500
              transition
              hover:bg-slate-800
              hover:text-slate-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <label
            className="
              flex
              min-h-[190px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-slate-700
              bg-slate-950/40
              px-6
              text-center
              transition
              hover:border-blue-500/50
              hover:bg-slate-800/30
            "
          >
            <div
              className="
                mb-4
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                border border-slate-700
                bg-slate-800/70
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5 text-blue-400"
              >
                <path d="M12 16V4" />
                <path d="m7 9 5-5 5 5" />
                <path d="M5 20h14" />
              </svg>
            </div>

            <p className="text-sm font-medium text-slate-200">
              Choose a CSV file
            </p>

            <p className="mt-1 text-xs text-slate-500">
              CSV files only
            </p>

            <span
              className="
                mt-4
                rounded-lg
                border border-slate-700
                bg-slate-800/60
                px-4 py-2
                text-xs
                font-medium
                text-slate-300
              "
            >
              Browse Files
            </span>

            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {uploading && (
            <div className="mt-4 flex items-center gap-2 text-xs text-blue-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              Uploading dataset...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="
              rounded-lg
              border border-slate-700
              bg-transparent
              px-4 py-2
              text-sm
              font-medium
              text-slate-400
              transition
              hover:bg-slate-800/60
              hover:text-slate-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}