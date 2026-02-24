import { useState } from "react";
import DatasetStats from "../components/DatasetStats";
import SchemaTable from "../components/SchemaTable";
import SampleTable from "../components/SampleTable";

const MOCK_DATASETS = [
  {
    id: 1,
    name: "Sales Data",
    rows: 120000,
    columns: 8,
    nullPercent: 2.3,
    lastRefresh: "2025-09-10",
    schema: [
      { column: "order_id", type: "INT", null: 0, desc: "Primary key" },
      { column: "customer_id", type: "INT", null: 0.1, desc: "Customer reference" },
      { column: "amount", type: "DECIMAL", null: 0.3, desc: "Order amount" },
      { column: "order_date", type: "DATE", null: 0, desc: "Order date" }
    ],
    sample: [
      { order_id: 101, customer_id: 23, amount: 540, order_date: "2025-01-10" },
      { order_id: 102, customer_id: 45, amount: 120, order_date: "2025-01-11" }
    ]
  }
];

export default function Datasets() {
  const [selected] = useState(MOCK_DATASETS[0]);

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
          Dataset Explorer
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Data profiling and schema inspection
        </p>
      </div>

      <DatasetStats dataset={selected} />

      <div className="mt-8 space-y-8">
        <SchemaTable schema={selected.schema} />
        <SampleTable rows={selected.sample} />
      </div>

    </div>
  );
}