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

  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      setLoading(true);

      const data = await getDatasets();

      setDatasets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load datasets:", error);
      setDatasets([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDatasets = useMemo(() => {
    let data = [...datasets];

    /* -------------------------------------------------------------- */
    /* Search                                                          */
    /* -------------------------------------------------------------- */

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      data = data.filter((dataset) =>
        dataset.table_name
          ?.toLowerCase()
          .includes(query)
      );
    }

    /* -------------------------------------------------------------- */
    /* Type Filter                                                      */
    /* -------------------------------------------------------------- */

    if (type !== "all") {
      data = data.filter(
        (dataset) =>
          dataset.type?.toLowerCase() === type.toLowerCase()
      );
    }

    /* -------------------------------------------------------------- */
    /* Source Filter                                                    */
    /* -------------------------------------------------------------- */

    if (source !== "all") {
      data = data.filter(
        (dataset) =>
          dataset.source?.toLowerCase() ===
          source.toLowerCase()
      );
    }

    /* -------------------------------------------------------------- */
    /* Sorting                                                          */
    /* -------------------------------------------------------------- */

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
          /*
           * updated_at may currently be null for existing
           * database tables. Those datasets stay at the bottom.
           */

          if (!a.updated_at && !b.updated_at) {
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

  /* -------------------------------------------------------------- */
  /* Dataset Selection                                               */
  /* -------------------------------------------------------------- */

  const handleSelectDataset = (dataset) => {
    setSelectedTable(dataset.table_name);
  };

  const handleBack = () => {
    setSelectedTable(null);
  };

  /* -------------------------------------------------------------- */
  /* Dataset Upload                                                   */
  /* -------------------------------------------------------------- */

  const handleUpload = async (file) => {
    try {
      setUploadOpen(false);

      const result = await uploadDataset(file);

      console.log("Dataset uploaded:", result);

      await loadDatasets();
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

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8">

        {/* ---------------------------------------------------------- */}
        {/* Dataset Detail                                             */}
        {/* ---------------------------------------------------------- */}

        {selectedTable ? (
          <DatasetDetails
            tableName={selectedTable}
            onBack={handleBack}
          />
        ) : (
          <>
            {/* Header */}
            <DatasetHeader
              onUpload={() => setUploadOpen(true)}
            />

            {/* Toolbar */}
            <DatasetToolbar
              search={search}
              onSearchChange={setSearch}
              type={type}
              onTypeChange={setType}
              source={source}
              onSourceChange={setSource}
              sort={sort}
              onSortChange={setSort}
            />

            {/* Loading */}
            {loading ? (
              <DatasetListSkeleton />
            ) : (
              <DatasetList
                datasets={filteredDatasets}
                onSelect={handleSelectDataset}
              />
            )}
          </>
        )}
      </div>

      {/* Upload Dialog */}
      <UploadDatasetDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Loading Skeleton                                                   */
/* ------------------------------------------------------------------ */

function DatasetListSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40">

      {/* Header */}
      <div className="border-b border-slate-800/80 px-5 py-4">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
      </div>

      {/* Column Header */}
      <div className="grid grid-cols-[minmax(260px,2fr)_140px_100px_100px_48px] items-center border-b border-slate-800/80 px-5 py-3">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-14 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-10 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-14 animate-pulse rounded bg-slate-800" />
        <div />
      </div>

      {/* Rows */}
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="grid grid-cols-[minmax(260px,2fr)_140px_100px_100px_48px] items-center border-b border-slate-800/70 px-5 py-5"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-800" />

            <div className="space-y-2">
              <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
              <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800" />
            </div>
          </div>

          <div className="h-6 w-16 animate-pulse rounded-md bg-slate-800" />

          <div className="h-3 w-8 animate-pulse rounded bg-slate-800" />

          <div className="h-3 w-8 animate-pulse rounded bg-slate-800" />

          <div />
        </div>
      ))}
    </div>
  );
}