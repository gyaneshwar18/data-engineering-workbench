// src/components/profile/roadmap/RoadmapSection.jsx

import React from "react";

const RoadmapSection = ({
  icon: Icon,
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <section
      className={`
        relative overflow-hidden
        rounded-3xl
        border border-slate-700/50
        bg-slate-900/60
        backdrop-blur-xl
        shadow-lg
        transition-all duration-300
        hover:border-blue-500/40
        hover:shadow-blue-500/10
        ${className}
      `}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20">
            {Icon && <Icon className="h-6 w-6 text-blue-400" />}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>

        {/* Accent */}
        <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />

        {/* Content */}
        <div className="mt-8 rounded-2xl border border-slate-700/40 bg-slate-950/40 p-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;