import { useEffect, useState } from "react";
import {
  getDatasets,
  getDatasetPreview,
  getDatasetSchema
} from "../api/datasetApi";

export default function Datasets() {

  const [datasets, setDatasets] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [preview, setPreview] = useState([]);
  const [schema, setSchema] = useState([]);

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

    setPreview(previewData);
    setSchema(schemaData);
  };

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

          {datasets.map((d) => (
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

                <pre className="overflow-auto">
                  {JSON.stringify(preview, null, 2)}
                </pre>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}