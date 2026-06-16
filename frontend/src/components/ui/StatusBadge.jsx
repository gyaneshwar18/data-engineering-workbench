export default function StatusBadge({ status }) {
  const styles = {
    success: "bg-green-500/10 text-green-400",
    failed: "bg-red-500/10 text-red-400",
    running: "bg-yellow-500/10 text-yellow-400",
    idle: "bg-slate-500/10 text-slate-400",
  };

  return (
    <span
      className={`
        px-2.5
        py-0.5
        rounded-full
        text-[11px]
        font-medium
        ${styles[status] || styles.idle}
      `}
    >
      ● {status?.toUpperCase()}
    </span>
  );
}