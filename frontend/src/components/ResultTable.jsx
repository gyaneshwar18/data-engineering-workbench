export default function ResultTable({ columns, rows }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th key={col} className="text-left p-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              {columns.map(col => (
                <td key={col} className="p-3">
                  {r[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
