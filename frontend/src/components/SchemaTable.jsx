export default function SchemaTable({ schema }) {
  return (
    <div className="
      bg-white/90 backdrop-blur
      rounded-2xl p-6
      border border-gray-100
      shadow-sm
      dark:bg-gray-900/80 dark:border-gray-800
    ">

      <h3 className="text-gray-800 dark:text-gray-100 font-semibold tracking-tight mb-6">
        Schema Overview
      </h3>

      <table className="w-full text-sm">

        <thead className="border-b dark:border-gray-700">
          <tr className="text-left text-gray-500">
            <th className="pb-3">Column</th>
            <th className="pb-3">Type</th>
            <th className="pb-3">Null %</th>
            <th className="pb-3">Description</th>
          </tr>
        </thead>

        <tbody>
          {schema.map((col, i) => (
            <tr key={i} className="border-t dark:border-gray-800">
              <td className="py-3 font-medium">{col.column}</td>
              <td className="py-3 text-gray-500">{col.type}</td>
              <td className="py-3">
                <span className={`px-2 py-1 text-xs rounded-full 
                  ${col.null > 1 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}
                `}>
                  {col.null}%
                </span>
              </td>
              <td className="py-3 text-gray-500">{col.desc}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}