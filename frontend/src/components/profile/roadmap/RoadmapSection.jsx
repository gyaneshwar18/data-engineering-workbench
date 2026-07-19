import React from "react";
import TechnologyCard from "./TechnologyCard";
import AnimatedConnector from "./AnimatedConnector";

const RoadmapSection = ({ section, showVerticalConnector = false }) => {
  return (
    <>
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-blue-500/20
          bg-[#0f172a]
          backdrop-blur-xl
          p-6
          shadow-[0_0_30px_rgba(37,99,235,0.08)]
        "
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />

        {/* ================= Header ================= */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border border-cyan-400/20
                bg-blue-500/10
                text-xl
              "
            >
              {section.icon}
            </div>

            {/* Title */}
            <div>
              <h2 className="text-lg font-semibold text-white">
                {section.title}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {section.subtitle}
              </p>
            </div>
          </div>

          {/* Accent Line */}
          <div className="mt-5 h-px w-full bg-gradient-to-r from-blue-500 via-cyan-400/20 to-transparent" />
        </div>

        {/* ================= Technology Flow ================= */}
        <div
          className="
            relative
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-y-6
          "
        >
          {section.technologies.map((technology, index) => (
            <React.Fragment key={technology.id}>
              <TechnologyCard technology={technology} />

              {index !== section.technologies.length - 1 && (
                <AnimatedConnector direction="horizontal" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Vertical Connector */}
      {showVerticalConnector && (
        <AnimatedConnector direction="vertical" />
      )}
    </>
  );
};

export default RoadmapSection;