export default function Panel({ title }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow h-64">
      <p className="text-gray-800 font-semibold tracking-tight mb-2">{title}</p>
      <p className="text-sm text-gray-400">
        Content coming here
      </p>
    </div>
  );
}
