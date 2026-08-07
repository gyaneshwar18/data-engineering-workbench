import { useState } from "react";
import { X } from "lucide-react";

export default function CreatePipelineDialog({
  isOpen,
  onClose,
  onCreate,
  creating = false,
}) {
  const [form, setForm] = useState({
    name: "",
    source: "csv",
    destination: "",
    file_path: "",
    api_url: "",
    schedule_type: "",
    is_active: false,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    if (!form.destination.trim()) {
      return;
    }

    if (form.source === "csv" && !form.file_path.trim()) {
      return;
    }

    if (form.source === "api" && !form.api_url.trim()) {
      return;
    }

    await onCreate({
      name: form.name.trim(),
      source: form.source,
      destination: form.destination.trim(),
      file_path:
        form.source === "csv"
          ? form.file_path.trim()
          : null,
      api_url:
        form.source === "api"
          ? form.api_url.trim()
          : null,
      schedule_type: form.is_active
        ? form.schedule_type || null
        : null,
      is_active: form.is_active,
    });
  };

  const handleClose = () => {
    if (creating) return;

    setForm({
      name: "",
      source: "csv",
      destination: "",
      file_path: "",
      api_url: "",
      schedule_type: "",
      is_active: false,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        px-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-xl
          overflow-hidden
          rounded-2xl
          border
          border-slate-700/80
          bg-[#0B1120]
          shadow-[0_30px_90px_rgba(0,0,0,0.75)]
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-lg font-semibold text-white">
              Create Pipeline
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Configure a new data ingestion pipeline.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={creating}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">

            {/* Pipeline Name */}

            <Field label="Pipeline Name">
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                placeholder="e.g. Sales CSV Pipeline"
                className={inputClass}
              />
            </Field>

            {/* Source */}

            <Field label="Source">
              <select
                value={form.source}
                onChange={(e) =>
                  handleChange("source", e.target.value)
                }
                className={inputClass}
              >
                <option value="csv">CSV</option>
                <option value="api">API</option>
              </select>
            </Field>

            {/* CSV */}

            {form.source === "csv" && (
              <Field label="File Path">
                <input
                  type="text"
                  value={form.file_path}
                  onChange={(e) =>
                    handleChange(
                      "file_path",
                      e.target.value
                    )
                  }
                  placeholder="data/sales.csv"
                  className={inputClass}
                />
              </Field>
            )}

            {/* API */}

            {form.source === "api" && (
              <Field label="API URL">
                <input
                  type="url"
                  value={form.api_url}
                  onChange={(e) =>
                    handleChange(
                      "api_url",
                      e.target.value
                    )
                  }
                  placeholder="https://api.example.com/users"
                  className={inputClass}
                />
              </Field>
            )}

            {/* Destination */}

            <Field label="Destination Table">
              <input
                type="text"
                value={form.destination}
                onChange={(e) =>
                  handleChange(
                    "destination",
                    e.target.value
                  )
                }
                placeholder="e.g. sales_table"
                className={inputClass}
              />
            </Field>

            {/* Scheduling */}

            <div
              className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900/40
                p-4
              "
            >
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    handleChange(
                      "is_active",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                />

                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Enable scheduling
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Run this pipeline automatically.
                  </p>
                </div>
              </label>

              {form.is_active && (
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Schedule
                  </label>

                  <select
                    value={form.schedule_type}
                    onChange={(e) =>
                      handleChange(
                        "schedule_type",
                        e.target.value
                      )
                    }
                    className={inputClass}
                  >
                    <option value="">
                      Select schedule
                    </option>
                    <option value="daily">
                      Daily
                    </option>
                    <option value="weekly">
                      Weekly
                    </option>
                    <option value="monthly">
                      Monthly
                    </option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}

          <div
            className="
              flex
              justify-end
              gap-3
              border-t
              border-slate-800
              px-6
              py-4
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={creating}
              className="
                rounded-lg
                border
                border-slate-700
                px-4
                py-2
                text-sm
                font-medium
                text-slate-300
                transition
                hover:bg-slate-800
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
              className="
                rounded-lg
                bg-blue-600
                px-5
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {creating
                ? "Creating..."
                : "Create Pipeline"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const inputClass = `
  w-full
  rounded-lg
  border
  border-slate-700
  bg-slate-950/60
  px-3
  py-2.5
  text-sm
  text-slate-200
  outline-none
  transition
  placeholder:text-slate-600
  focus:border-blue-500/60
  focus:ring-1
  focus:ring-blue-500/30
`;

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      {children}
    </div>
  );
}