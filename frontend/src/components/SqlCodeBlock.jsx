export default function SqlCodeBlock({ code, onChange }) {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black text-green-400 font-mono text-sm p-4 rounded-xl border border-gray-800 focus:outline-none"
      rows={8}
    />
  );
}