import React from "react";

const statusStyles = {
  Completed:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  Current:
    "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  Planned:
    "bg-slate-500/15 text-slate-300 border border-slate-500/30",
};

const TechnologyCard = ({ technology }) => {
  const { name, description, logo, status } = technology;

  return (
    <div
      className="
        group
        relative
        w-[150px]
        min-w-[150px]
        rounded-2xl
        border border-blue-500/20
        bg-[#0b1220]
        backdrop-blur-xl
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-400/40
        hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]
      "
    >
      {/* Soft Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Logo */}
      <div className="relative flex justify-center">
        <img
          src={logo}
          alt={name}
          className="h-12 w-12 object-contain"
          draggable={false}
        />
      </div>

      {/* Name */}
      <h3 className="relative mt-4 text-center text-sm font-semibold text-white">
        {name}
      </h3>

      {/* Description */}
      <p className="relative mt-1 text-center text-xs leading-5 text-slate-400">
        {description}
      </p>

      {/* Status */}
      <div className="relative mt-4 flex justify-center">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default TechnologyCard;