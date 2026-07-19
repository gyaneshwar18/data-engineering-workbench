import React from "react";
import { Map } from "lucide-react";

import RoadmapSection from "./roadmap/RoadmapSection";
import roadmapData from "./roadmap/roadmapData";

const EngineeringRoadmap = () => {
  return (
    <section className="space-y-8">
      {/* ================= Header ================= */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-blue-500/10">
          <Map className="h-6 w-6 text-cyan-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Engineering Roadmap
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            My structured learning journey toward becoming a Modern Data
            Engineer, covering programming foundations, data engineering,
            Azure cloud technologies, and production-grade data platforms.
          </p>
        </div>
      </div>

      {/* ================= Roadmap ================= */}
      <div className="space-y-0">
        {roadmapData.map((section, index) => (
          <RoadmapSection
            key={section.id}
            section={section}
            showVerticalConnector={index !== roadmapData.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default EngineeringRoadmap;