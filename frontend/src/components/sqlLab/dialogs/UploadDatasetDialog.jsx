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
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/70
        p-3
        backdrop-blur-sm

        sm:p-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          min-w-0
          overflow-hidden

          rounded-xl
          border
          border-slate-700
          bg-slate-900
          shadow-2xl

          sm:rounded-2xl
        "
      >
        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <div
          className="
            flex
            min-w-0
            items-center
            justify-between
            gap-3

            border-b
            border-slate-700

            px-3.5
            py-3

            sm:px-6
            sm:py-5
          "
        >
          <div className="min-w-0">
            <h2
              className="
                truncate
                text-sm
                font-semibold
                text-white

                sm:text-lg
              "
            >
              Upload Dataset
            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[10px]
                text-slate-400

                sm:mt-1
                sm:text-sm
              "
            >
              Import a CSV dataset into SQL Lab.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={uploading}
            aria-label="Close upload dialog"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center

              rounded-lg
              text-slate-400

              transition-colors

              hover:bg-slate-800
              hover:text-white

              disabled:cursor-not-allowed
              disabled:opacity-50

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/30

              sm:h-9
              sm:w-9
            "
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* ================================================= */}
        {/* BODY                                              */}
        {/* ================================================= */}

        <div
          className="
            min-w-0
            p-3.5

            sm:p-6
          "
        >
          {/* File Picker */}

          <button
            type="button"
            onClick={openFilePicker}
            disabled={uploading}
            className="
              flex
              min-h-[180px]
              w-full
              flex-col
              items-center
              justify-center

              rounded-xl
              border-2
              border-dashed
              border-slate-700

              bg-slate-800/40

              px-4
              py-8

              text-center

              transition-colors

              hover:border-cyan-500/50
              hover:bg-slate-800

              disabled:cursor-not-allowed
              disabled:opacity-60

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/20

              sm:min-h-[250px]
              sm:rounded-2xl
              sm:px-6
              sm:py-12
            "
          >
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-xl
                border
                border-cyan-500/20
                bg-cyan-500/10

                sm:mb-5
                sm:h-16
                sm:w-16
                sm:rounded-2xl
              "
            >
              <Upload
                className="
                  h-6
                  w-6
                  text-cyan-400

                  sm:h-8
                  sm:w-8
                "
              />
            </div>

            <h3
              className="
                text-sm
                font-semibold
                text-white

                sm:text-base
              "
            >
              Choose CSV File
            </h3>

            <p
              className="
                mt-1.5
                text-xs
                text-slate-400

                sm:mt-2
                sm:text-sm
              "
            >
              Click to browse your computer
            </p>

            <p
              className="
                mt-0.5
                text-[10px]
                text-slate-500

                sm:mt-1
                sm:text-xs
              "
            >
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
          {/* ERROR                                             */}
          {/* ================================================= */}

          {error && (
            <div
              className="
                mt-3
                flex
                min-w-0
                items-start
                gap-2.5

                rounded-lg
                border
                border-red-500/20
                bg-red-500/10

                p-3

                sm:mt-4
                sm:gap-3
                sm:rounded-xl
                sm:p-4
              "
            >
              <AlertCircle
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-red-400

                  sm:h-5
                  sm:w-5
                "
              />

              <p
                className="
                  min-w-0
                  text-xs
                  leading-5
                  text-red-300

                  sm:text-sm
                "
              >
                {error}
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* UPLOAD PROGRESS                                   */}
          {/* ================================================= */}

          {uploading && (
            <div
              className="
                mt-3
                rounded-lg
                border
                border-cyan-500/20
                bg-cyan-500/10

                p-3

                sm:mt-5
                sm:rounded-xl
                sm:p-4
              "
            >
              <div className="flex items-center justify-between gap-3">
                <p
                  className="
                    text-xs
                    font-medium
                    text-cyan-300

                    sm:text-sm
                  "
                >
                  Uploading dataset...
                </p>

                <span
                  className="
                    shrink-0
                    text-[10px]
                    text-cyan-400

                    sm:text-xs
                  "
                >
                  Please wait
                </span>
              </div>

              <div
                className="
                  mt-2.5
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-slate-800

                  sm:mt-3
                "
              >
                <div
                  className="
                    h-full
                    w-1/2
                    animate-pulse
                    rounded-full
                    bg-cyan-400
                  "
                />
              </div>
            </div>
          )}

          {/* ================================================= */}
          {/* SUCCESS                                           */}
          {/* ================================================= */}

          {uploadedTable && !uploading && (
            <div
              className="
                mt-3
                flex
                min-w-0
                items-start
                gap-2.5

                rounded-lg
                border
                border-emerald-500/20
                bg-emerald-500/10

                p-3

                sm:mt-5
                sm:gap-3
                sm:rounded-xl
                sm:p-4
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-lg
                  bg-emerald-500/10

                  sm:h-10
                  sm:w-10
                "
              >
                <FileSpreadsheet
                  className="
                    h-4
                    w-4
                    text-emerald-400

                    sm:h-5
                    sm:w-5
                  "
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    font-medium
                    text-emerald-300

                    sm:text-sm
                  "
                >
                  Dataset uploaded
                </p>

                <p
                  className="
                    mt-0.5
                    break-words
                    text-[10px]
                    leading-4
                    text-emerald-400

                    sm:mt-1
                    sm:text-xs
                  "
                >
                  Table "{uploadedTable}" is ready to query.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* FOOTER                                            */}
        {/* ================================================= */}

        <div
          className="
            flex
            shrink-0
            gap-2

            border-t
            border-slate-700

            px-3.5
            py-3

            sm:justify-end
            sm:gap-3
            sm:px-6
            sm:py-5
          "
        >
          <button
            type="button"
            onClick={handleClose}
            disabled={uploading}
            className="
              flex-1
              rounded-lg
              border
              border-slate-700
              bg-slate-800

              px-3
              py-2

              text-xs
              font-medium
              text-slate-300

              transition-colors

              hover:bg-slate-700
              hover:text-white

              disabled:cursor-not-allowed
              disabled:opacity-50

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/20

              sm:flex-none
              sm:rounded-xl
              sm:px-5
              sm:py-2.5
              sm:text-sm
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
              flex-1
              items-center
              justify-center
              gap-1.5

              rounded-lg
              bg-cyan-500

              px-3
              py-2

              text-xs
              font-semibold
              text-slate-950

              transition-colors

              hover:bg-cyan-400

              disabled:cursor-not-allowed
              disabled:opacity-60

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/30

              sm:flex-none
              sm:gap-2
              sm:rounded-xl
              sm:px-5
              sm:py-2.5
              sm:text-sm
            "
          >
            <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

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