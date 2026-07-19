import React from "react";

const AnimatedConnector = ({ direction = "horizontal" }) => {
  if (direction === "vertical") {
    return (
      <div className="relative mx-auto flex h-16 w-6 items-center justify-center overflow-hidden">
        {/* Line */}
        <div className="h-full w-px bg-gradient-to-b from-blue-500/20 via-cyan-400/70 to-cyan-400/20" />

        {/* Animated Dot */}
        <div className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(59,130,246,0.9)] animate-roadmap-dot-vertical" />
      </div>
    );
  }

  return (
    <div className="relative flex h-6 w-10 items-center overflow-hidden">
      {/* Line */}
      <div className="h-px w-full bg-gradient-to-r  from-blue-500/20  via-blue-500/80  to-blue-500/20" />

      {/* Animated Dot */}
      <div className="absolute h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.9)] animate-roadmap-dot-horizontal" />
    </div>
  );
};

export default AnimatedConnector;