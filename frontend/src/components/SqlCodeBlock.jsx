export default function SqlCodeBlock({ code, onChange }) {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black text-green-400 font-mono text-sm p-4 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:rin g-blue-500 min-h-37.5"
    />
  );
}