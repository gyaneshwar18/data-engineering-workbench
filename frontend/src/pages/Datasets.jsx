import { useEffect, useMemo, useState } from "react";

import {
  getDatasets,
  uploadDataset,
} from "../api/datasetApi";

import {
  DatasetHeader,
  DatasetToolbar,
  DatasetList,
  DatasetDetails,
} from "../components/datasets";

import UploadDatasetDialog from "../components/datasets/dialogs/UploadDatasetDialog";

export default function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [source, setSource] = useState("all");
  const [sort, setSort] = useState("recent");

  /* ============================================================ */
  /* DATASET NAVIGATION                                            */
  /* ============================================================ */

  const [activeTab, setActiveTab] = useState("all");

  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  /* ============================================================ */
  /* LOAD DATASETS                                                 */
  /* ============================================================ */

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      setLoading(true);

      const data = await getDatasets();

      setDatasets(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to load datasets:",
        error
      );

      setDatasets([]);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================ */
  /* FILTER + SORT                                                 */
  /* ============================================================ */

  const filteredDatasets = useMemo(() => {
    let data = [...datasets];

    /* Search */

    if (search.trim()) {
      const query = search
        .toLowerCase()
        .trim();

      data = data.filter((dataset) =>
        dataset.table_name
          ?.toLowerCase()
          .includes(query)
      );
    }

    /* Type */

    if (type !== "all") {
      data = data.filter(
        (dataset) =>
          dataset.type?.toLowerCase() ===
          type.toLowerCase()
      );
    }

    /* Source */

    if (source !== "all") {
      data = data.filter(
        (dataset) =>
          dataset.source?.toLowerCase() ===
          source.toLowerCase()
      );
    }

    /* Sort */

    switch (sort) {
      case "name":
        data.sort((a, b) =>
          (a.table_name || "").localeCompare(
            b.table_name || ""
          )
        );
        break;

      case "rows":
        data.sort(
          (a, b) =>
            (Number(b.row_count) || 0) -
            (Number(a.row_count) || 0)
        );
        break;

      case "columns":
        data.sort(
          (a, b) =>
            (Number(b.column_count) || 0) -
            (Number(a.column_count) || 0)
        );
        break;

      case "recent":
      default:
        data.sort((a, b) => {
          if (
            !a.updated_at &&
            !b.updated_at
          ) {
            return 0;
          }

          if (!a.updated_at) {
            return 1;
          }

          if (!b.updated_at) {
            return -1;
          }

          return (
            new Date(b.updated_at) -
            new Date(a.updated_at)
          );
        });

        break;
    }

    return data;
  }, [
    datasets,
    search,
    type,
    source,
    sort,
  ]);

  /* ============================================================ */
  /* DATASET SELECTION                                             */
  /* ============================================================ */

  const handleSelectDataset = (dataset) => {
    setSelectedTable(dataset.table_name);
  };

  const handleBack = () => {
    setSelectedTable(null);
  };

  /* ============================================================ */
  /* DATASET UPLOAD                                                */
  /* ============================================================ */

  const handleUpload = async (file) => {
    try {
      setUploadOpen(false);

      const result =
        await uploadDataset(file);

      console.log(
        "Dataset uploaded:",
        result
      );

      await loadDatasets();

      /* After uploading, stay on All Datasets */
      setActiveTab("all");
    } catch (error) {
      console.error(
        "Dataset upload failed:",
        error
      );

      alert(
        error?.response?.data?.detail ||
          "Failed to upload dataset."
      );
    }
  };

  /* ============================================================ */
  /* EMPTY TAB STATE                                               */
  /* ============================================================ */

  const renderTabEmptyState = () => {
    const messages = {
      my: {
        title: "No datasets found",
        description:
          "No datasets have been added to your collection yet.",
      },

      recent: {
        title: "No recent datasets",
        description:
          "No recently added datasets are available yet.",
      },

      favorites: {
        title: "No favorite datasets",
        description:
          "No datasets have been added to your favorites yet.",
      },
    };

    const content = messages[activeTab];

    if (!content) return null;

    return (
      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center

          rounded-2xl

          border
          border-slate-800/80

          bg-slate-950/40

          px-6
        "
      >
        <div
          className="
            flex
            max-w-sm
            flex-col
            items-center
            text-center
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
              border-slate-700/80

              bg-slate-800/50
            "
          >
            <span
              className="
                text-xl
                text-slate-500
              "
            >
              —
            </span>
          </div>

          <p
            className="
              text-[15px]
              font-semibold
              text-slate-300
            "
          >
            {content.title}
          </p>

          <p
            className="
              mt-1.5
              text-sm
              leading-6
              text-slate-500
            "
          >
            {content.description}
          </p>
        </div>
      </div>
    );
  };

  /* ============================================================ */
  /* RENDER                                                        */
  /* ============================================================ */

  return (
    <div className="min-h-full">
      <div
        className="
          mx-auto
          max-w-[1600px]
          space-y-6
          px-4
          py-6

          sm:px-6
          sm:py-8
        "
      >

        {/* ====================================================== */}
        {/* DATASET DETAILS                                        */}
        {/* ====================================================== */}

        {selectedTable ? (
          <DatasetDetails
            tableName={selectedTable}
            onBack={handleBack}
          />
        ) : (
          <>
            {/* ================================================== */}
            {/* HEADER                                             */}
            {/* ================================================== */}

            <DatasetHeader
              onUpload={() =>
                setUploadOpen(true)
              }
            />

            {/* ================================================== */}
            {/* TOOLBAR + TABS                                     */}
            {/* ================================================== */}

            <DatasetToolbar
              search={search}
              onSearchChange={setSearch}

              type={type}
              onTypeChange={setType}

              source={source}
              onSourceChange={setSource}

              sort={sort}
              onSortChange={setSort}

              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* ================================================== */}
            {/* ALL DATASETS                                       */}
            {/* ================================================== */}

            {activeTab === "all" && (
              <>
                {loading ? (
                  <DatasetListSkeleton />
                ) : (
                  <DatasetList
                    datasets={
                      filteredDatasets
                    }
                    onSelect={
                      handleSelectDataset
                    }
                  />
                )}
              </>
            )}

            {/* ================================================== */}
            {/* OTHER TABS                                         */}
            {/* ================================================== */}

            {activeTab !== "all" &&
              renderTabEmptyState()}
          </>
        )}
      </div>

      {/* ======================================================== */}
      {/* UPLOAD DIALOG                                            */}
      {/* ======================================================== */}

      <UploadDatasetDialog
        open={uploadOpen}
        onClose={() =>
          setUploadOpen(false)
        }
        onUpload={handleUpload}
      />
    </div>
  );
}

/* ================================================================= */
/* LOADING SKELETON                                                  */
/* ================================================================= */

function DatasetListSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-800/80
        bg-slate-950/40
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-slate-800/80
          px-5
          py-4
        "
      >
        <div
          className="
            h-4
            w-24
            animate-pulse
            rounded
            bg-slate-800
          "
        />
      </div>

      {/* Column Header */}

      <div
        className="
          hidden
          grid-cols-[minmax(260px,2fr)_140px_100px_100px_48px]
          items-center
          border-b
          border-slate-800/80
          px-5
          py-3

          md:grid
        "
      >
        <div
          className="
            h-3
            w-16
            animate-pulse
            rounded
            bg-slate-800
          "
        />

        <div
          className="
            h-3
            w-14
            animate-pulse
            rounded
            bg-slate-800
          "
        />

        <div
          className="
            h-3
            w-10
            animate-pulse
            rounded
            bg-slate-800
          "
        />

        <div
          className="
            h-3
            w-14
            animate-pulse
            rounded
            bg-slate-800
          "
        />

        <div />
      </div>

      {/* Rows */}

      {[1, 2, 3, 4, 5].map(
        (item) => (
          <div
            key={item}
            className="
              grid
              grid-cols-1
              gap-4

              border-b
              border-slate-800/70

              px-5
              py-5

              md:grid-cols-[minmax(260px,2fr)_140px_100px_100px_48px]
              md:items-center
              md:gap-0
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  h-9
                  w-9
                  shrink-0
                  animate-pulse
                  rounded-lg
                  bg-slate-800
                "
              />

              <div className="space-y-2">
                <div
                  className="
                    h-3
                    w-32
                    animate-pulse
                    rounded
                    bg-slate-800
                  "
                />

                <div
                  className="
                    h-2.5
                    w-24
                    animate-pulse
                    rounded
                    bg-slate-800
                  "
                />
              </div>
            </div>

            <div
              className="
                h-6
                w-16
                animate-pulse
                rounded-md
                bg-slate-800
              "
            />

            <div
              className="
                h-3
                w-8
                animate-pulse
                rounded
                bg-slate-800
              "
            />

            <div
              className="
                h-3
                w-8
                animate-pulse
                rounded
                bg-slate-800
              "
            />

            <div />
          </div>
        )
      )}
    </div>
  );
}