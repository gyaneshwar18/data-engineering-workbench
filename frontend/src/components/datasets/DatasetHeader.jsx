import { Upload } from "lucide-react";

export default function DatasetHeader({ onUpload }) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4

        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      {/* Title */}

      <div className="min-w-0">
        <h1
          className="
            text-2xl
            font-semibold
            tracking-tight
            text-white
          "
        >
          Datasets
        </h1>

        <p
          className="
            mt-1
            max-w-md
            text-sm
            leading-5
            text-slate-400
          "
        >
          Explore and manage all your datasets
        </p>
      </div>

      {/* Upload */}

      <button
        type="button"
        onClick={onUpload}
        className="
          inline-flex
          h-10
          w-full
          shrink-0
          items-center
          justify-center
          gap-2

          rounded-lg

          border
          border-blue-500/30

          bg-blue-600

          px-4

          text-sm
          font-medium
          text-white

          transition-colors
          duration-150

          hover:bg-blue-500

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500/30

          sm:w-auto
        "
      >
        <Upload
          size={16}
          strokeWidth={2}
        />

        <span>Upload Dataset</span>
      </button>
    </div>
  );
}