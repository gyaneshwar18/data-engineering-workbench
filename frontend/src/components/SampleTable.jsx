export default function SampleTable({ rows }) {

  if (!rows.length) return null;

  const columns = Object.keys(rows[0]);

  return (
    <div className="
      bg-white/90 backdrop-blur
      rounded-2xl p-6
      border border-gray-100
      shadow-sm
      dark:bg-gray-900/80 dark:border-gray-800
    ">

      <h3 className="text-gray-800 dark:text-gray-100 font-semibold tracking-tight mb-6">
        Sample Data Preview
      </h3>

      <table className="w-full text-sm">

        <thead className="border-b dark:border-gray-700">
          <tr className="text-left text-gray-500">
            {columns.map(col => (
              <th key={col} className="pb-3">{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t dark:border-gray-800">
              {columns.map(col => (
                <td key={col} className="py-3">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}