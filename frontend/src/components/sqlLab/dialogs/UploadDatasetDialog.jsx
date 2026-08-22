import { useRef, useState } from "react";
import {
  Upload,
  X,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";

const UploadDatasetDialog = ({
  open = false,
  uploading = false,
  uploadedTable = "",
  onClose = () => {},
  onUpload = () => {},
}) => {
  const fileInputRef = useRef(null);

  const [error, setError] = useState("");

  if (!open) return null;

  const openFilePicker = () => {
    if (uploading) return;

    setError("");
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    // Reset input so the same file can be selected again.
    event.target.value = "";

    if (!file) return;

    const isCSV =
      file.type === "text/csv" ||
      file.name.toLowerCase().endsWith(".csv");

    if (!isCSV) {
      setError("Please select a CSV file.");
      return;
    }

    setError("");

    onUpload(file);
  };

  const handleClose = () => {
    if (uploading) return;

    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* ================================================= */}
        {/* Header                                            */}
        {/* ================================================= */}

        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Upload Dataset
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Import a CSV dataset into SQL Lab.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={uploading}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close upload dialog"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* ================================================= */}
        {/* Body                                              */}
        {/* ================================================= */}

        <div className="p-6">

          <button
            type="button"
            onClick={openFilePicker}
            disabled={uploading}
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-700
              bg-slate-800/40
              px-6
              py-12
              text-center
              transition
              hover:border-cyan-500/50
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            <div
              className="
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-500/20
                bg-cyan-500/10
              "
            >
              <Upload className="h-8 w-8 text-cyan-400" />
            </div>

            <h3 className="text-base font-semibold text-white">
              Choose CSV File
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Click to browse your computer
            </p>

            <p className="mt-1 text-xs text-slate-500">
              CSV files only
            </p>

          </button>

          {/* Hidden file input */}

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* ================================================= */}
          {/* Error                                             */}
          {/* ================================================= */}

          {error && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">

              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />

              <p className="text-sm text-red-300">
                {error}
              </p>

            </div>
          )}

          {/* ================================================= */}
          {/* Upload Progress                                   */}
          {/* ================================================= */}

          {uploading && (
            <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">

              <div className="flex items-center justify-between">

                <p className="text-sm font-medium text-cyan-300">
                  Uploading dataset...
                </p>

                <span className="text-xs text-cyan-400">
                  Please wait
                </span>

              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-400" />
              </div>

            </div>
          )}

          {/* ================================================= */}
          {/* Success                                           */}
          {/* ================================================= */}

          {uploadedTable && !uploading && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Dataset uploaded
                </p>

                <p className="mt-1 text-xs text-emerald-400">
                  Table "{uploadedTable}" is ready to query.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* Footer                                            */}
        {/* ================================================= */}

        <div className="flex justify-end gap-3 border-t border-slate-700 px-6 py-5">

          <button
            type="button"
            onClick={handleClose}
            disabled={uploading}
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-5
              py-2.5
              text-sm
              font-medium
              text-slate-300
              transition
              hover:bg-slate-700
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={uploading}
            onClick={openFilePicker}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-950
              transition
              hover:bg-cyan-400
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Upload className="h-4 w-4" />

            {uploading
              ? "Uploading..."
              : "Select File"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default UploadDatasetDialog;