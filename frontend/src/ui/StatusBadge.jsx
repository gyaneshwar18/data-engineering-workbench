export default function StatusBadge({ status }) {

  const styles = {
    success: "bg-green-500/15 text-green-400 border border-green-500/20",
    failed: "bg-red-500/15 text-red-400 border border-red-500/20",
    running: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    idle: "bg-slate-500/15 text-slate-400 border border-slate-500/20",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        ${styles[status] || styles.idle}
      `}
    >
      {status?.toUpperCase()}
    </span>
  );
}