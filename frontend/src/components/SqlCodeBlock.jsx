export default function SqlCodeBlock({ code }) {
  return (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
}
