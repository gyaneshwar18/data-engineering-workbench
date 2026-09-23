import React from "react";
import { Map } from "lucide-react";

import RoadmapSection from "./roadmap/RoadmapSection";
import roadmapData from "./roadmap/roadmapData";

const EngineeringRoadmap = () => {
  return (
    <section className="space-y-8">
      {/* ================= Header ================= */}

      <div className="flex items-start gap-4">
        {/* Icon */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center

            rounded-xl

            border
            border-cyan-400/20

            bg-blue-500/10

            shadow-[0_0_18px_rgba(6,182,212,0.06)]
          "
        >
          <Map
            className="
              h-5
              w-5
              text-cyan-400
            "
          />
        </div>

        {/* Heading + Description */}

        <div className="min-w-0 flex-1">
          <h2
            className="
              whitespace-nowrap

              text-xl
              font-bold
              tracking-tight
              text-white

              sm:text-2xl
            "
          >
            My Engineering Roadmap
          </h2>

          <p
            className="
              mt-2
              max-w-3xl

              text-sm
              leading-6
              text-slate-400
            "
          >
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