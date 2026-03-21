export default function ResultTable({ columns, rows }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

      <div className="overflow-x-auto max-h-100">
        <table className="w-full text-sm text-gray-300">

          <thead className="bg-gray-800 sticky top-0">
            <tr>
              {columns.map(col => (
                <th key={col} className="text-left px-4 py-2 text-gray-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-t border-gray-800 hover:bg-gray-800"
              >
                {columns.map(col => (
                  <td key={col} className="px-4 py-2">
                    {r[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}