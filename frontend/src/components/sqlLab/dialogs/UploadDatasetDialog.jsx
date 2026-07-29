import { useRef } from "react";
import {
  Upload,
  X,
  FileSpreadsheet,
} from "lucide-react";

const UploadDatasetDialog = ({
  open = false,
  uploading = false,
  uploadedTable = "",
  onClose = () => {},
  onUpload = () => {},
}) => {
  const fileInputRef = useRef(null);

  if (!open) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onUpload(file);

    e.target.value = "";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Upload Dataset
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Import a CSV file into SQL Lab.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/40 px-6 py-12 transition hover:border-cyan-500/50 hover:bg-slate-800"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
              <Upload className="h-8 w-8 text-cyan-400" />
            </div>

            <h3 className="text-base font-semibold text-white">
              Choose CSV File
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Click to browse your computer
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Supported format: .csv
            </p>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileSelect}
          />

          {uploadedTable && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <FileSpreadsheet className="h-6 w-6 text-emerald-400" />

              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Upload Successful
                </p>

                <p className="text-xs text-emerald-400">
                  Table "{uploadedTable}" is ready.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-700 px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Select File"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDatasetDialog;