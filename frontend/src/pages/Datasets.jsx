import { useEffect, useState } from "react";
import {
  getDatasets,
  getDatasetPreview,
  getDatasetSchema,
  getDatasetStats
} from "../api/datasetApi";

export default function Datasets() {

  const [datasets, setDatasets] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [preview, setPreview] = useState([]);
  const [schema, setSchema] = useState([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      const data = await getDatasets();
      setDatasets(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectTable = async (tableName) => {
    setSelectedTable(tableName);

    const previewData =
      await getDatasetPreview(tableName);

    const schemaData =
      await getDatasetSchema(tableName);

    const statsData =
      await getDatasetStats(tableName);

    setPreview(previewData);
    setSchema(schemaData);
    setStats(statsData);
  };

  const filteredDatasets = datasets.filter((d) =>
    d.table_name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">
        Dataset Explorer
      </h1>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT PANEL */}
        <div className="col-span-3 bg-gray-900 p-4 rounded">

          <h2 className="font-semibold mb-4">
            Datasets
          </h2>
          <input
            type="text"
            placeholder="Search datasets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          />
          {filteredDatasets.map((d) => (
            <div
              key={d.table_name}
              onClick={() =>
                handleSelectTable(d.table_name)
              }
              className="cursor-pointer p-2 rounded hover:bg-gray-800"
            >
              {d.table_name}
            </div>
          ))}

        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-9">

          {selectedTable && (
            <>
              <h2 className="text-xl mb-4">
                {selectedTable}
              </h2>

              
              {stats && (
                <div className="bg-gray-900 p-4 rounded mb-4">

                  <h3 className="font-semibold mb-3">
                    Dataset Statistics
                  </h3>

                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-gray-400">Rows</p>
                      <p className="text-xl font-bold">
                        {stats.row_count}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Columns</p>
                      <p className="text-xl font-bold">
                        {stats.column_count}
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {/* SCHEMA */}
              <div className="bg-gray-900 p-4 rounded mb-4">

                <h3 className="font-semibold mb-3">
                  Schema
                </h3>

                <table className="w-full">

                  <thead>
                    <tr>
                      <th>Column</th>
                      <th>Type</th>
                    </tr>
                  </thead>

                  <tbody>
                    {schema.map((col, idx) => (
                      <tr key={idx}>
                        <td>{col.column_name}</td>
                        <td>{col.data_type}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

              {/* PREVIEW */}
              <div className="bg-gray-900 p-4 rounded">

                <h3 className="font-semibold mb-3">
                  Preview
                </h3>

                <div className="overflow-auto">

                  {preview.length > 0 && (

                    <table className="w-full border-collapse">

                      <thead>
                        <tr>

                          {Object.keys(preview[0]).map((key) => (
                            <th
                              key={key}
                              className="border border-gray-700 p-2 text-left"
                            >
                              {key}
                            </th>
                          ))}

                        </tr>
                      </thead>

                      <tbody>

                        {preview.map((row, index) => (
                          <tr key={index}>

                            {Object.values(row).map((value, idx) => (
                              <td
                                key={idx}
                                className="border border-gray-700 p-2"
                              >
                                {String(value)}
                              </td>
                            ))}

                          </tr>
                        ))}

                      </tbody>

                    </table>

                  )}

                </div>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}