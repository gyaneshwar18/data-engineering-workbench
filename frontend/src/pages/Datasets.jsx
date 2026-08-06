import { useEffect, useMemo, useState } from "react";

import {
  getDatasets,
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

    // Search
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      data = data.filter((dataset) =>
        dataset.table_name?.toLowerCase().includes(query)
      );
    }

    /*
     * Type and source filters are kept in the UI architecture,
     * but the current /datasets API only returns table_name.
     *
     * Therefore we intentionally don't fake CSV/API metadata here.
     */

    if (sort === "name") {
      data.sort((a, b) =>
        a.table_name.localeCompare(b.table_name)
      );
    }

    return data;
  }, [datasets, search, sort]);

  const handleSelectDataset = (dataset) => {
    setSelectedTable(dataset.table_name);
  };

  const handleBack = () => {
    setSelectedTable(null);
  };

  const handleUpload = () => {
    /*
     * Upload endpoint does not currently exist in datasetApi.js.
     * Keep the dialog ready for when the backend endpoint is added.
     */
    alert(
      "Dataset upload is not connected yet. The backend upload endpoint needs to be added first."
    );
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8">

        {/* -------------------------------------------------------------- */}
        {/* Dataset Detail                                                 */}
        {/* -------------------------------------------------------------- */}

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

/* ---------------------------------------------------------------------- */
/* Loading Skeleton                                                       */
/* ---------------------------------------------------------------------- */

function DatasetListSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40">
      {/* Header */}
      <div className="border-b border-slate-800/80 px-5 py-4">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
      </div>

      {/* Column header */}
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