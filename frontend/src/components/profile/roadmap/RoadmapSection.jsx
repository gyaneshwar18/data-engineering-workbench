import React from "react";
import TechnologyCard from "./TechnologyCard";
import AnimatedConnector from "./AnimatedConnector";

const RoadmapSection = ({
  section,
  showVerticalConnector = false,
}) => {
  const technologies = section.technologies || [];

  return (
    <>
      <section
        className="
          relative
          overflow-hidden

          rounded-3xl

          border
          border-blue-500/20

          bg-[#0f172a]

          backdrop-blur-xl

          p-4
          sm:p-6

          shadow-[0_0_30px_rgba(37,99,235,0.08)]
        "
      >
        {/* ================================================= */}
        {/* BACKGROUND GLOW                                  */}
        {/* ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-cyan-500/5
            via-transparent
            to-transparent
          "
        />

        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            {/* Icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-xl

                border
                border-cyan-400/20

                bg-blue-500/10

                text-lg

                sm:h-11
                sm:w-11
                sm:text-xl
              "
            >
              {section.icon}
            </div>

            {/* Title */}

            <div className="min-w-0">
              <h2
                className="
                  text-base
                  font-semibold
                  text-white

                  sm:text-lg
                "
              >
                {section.title}
              </h2>

              <p
                className="
                  mt-1

                  text-xs
                  leading-5
                  text-slate-400

                  sm:text-sm
                "
              >
                {section.subtitle}
              </p>
            </div>
          </div>

          {/* Accent Line */}

          <div
            className="
              mt-4
              h-px
              w-full

              bg-gradient-to-r
              from-blue-500
              via-cyan-400/20
              to-transparent

              sm:mt-5
            "
          />
        </div>

        {/* ================================================= */}
        {/* MOBILE ROADMAP                                   */}
        {/* ================================================= */}

        <div
          className="
            relative
            z-10

            mt-6

            grid

            grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)]

            grid-rows-auto

            items-center

            gap-y-5

            lg:hidden
          "
        >
          {/* ============================================= */}
          {/* CARD 1 — TOP LEFT                            */}
          {/* ============================================= */}

          {technologies[0] && (
            <div className="col-start-1 row-start-1 min-w-0">
              <TechnologyCard technology={technologies[0]} />
            </div>
          )}

          {/* ============================================= */}
          {/* CONNECTOR — CARD 1 → CARD 2                  */}
          {/* ============================================= */}

          {technologies[1] && (
            <div
              className="
                col-start-2
                row-start-1

                flex
                items-center
                justify-center
              "
            >
              <AnimatedConnector direction="horizontal" />
            </div>
          )}

          {/* ============================================= */}
          {/* CARD 2 — TOP RIGHT                           */}
          {/* ============================================= */}

          {technologies[1] && (
            <div className="col-start-3 row-start-1 min-w-0">
              <TechnologyCard technology={technologies[1]} />
            </div>
          )}

          {/* ============================================= */}
          {/* VERTICAL CONNECTOR — CARD 2 ↓ CARD 3         */}
          {/* ============================================= */}

          {technologies[2] && (
            <div
              className="
                col-start-3
                row-start-2

                flex
                h-5
                items-center
                justify-center
              "
            >
              <AnimatedConnector direction="vertical" />
            </div>
          )}

          {/* ============================================= */}
          {/* CARD 3 — BOTTOM LEFT                         */}
          {/* ============================================= */}

          {technologies[2] && (
            <div className="col-start-1 row-start-3 min-w-0">
              <TechnologyCard technology={technologies[2]} />
            </div>
          )}

          {/* ============================================= */}
          {/* CONNECTOR — CARD 3 → CARD 4                  */}
          {/* ============================================= */}

          {technologies[3] && (
            <div
              className="
                col-start-2
                row-start-3

                flex
                items-center
                justify-center
              "
            >
              <AnimatedConnector direction="horizontal" />
            </div>
          )}

          {/* ============================================= */}
          {/* CARD 4 — BOTTOM RIGHT                        */}
          {/* ============================================= */}

          {technologies[3] && (
            <div className="col-start-3 row-start-3 min-w-0">
              <TechnologyCard technology={technologies[3]} />
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* DESKTOP ROADMAP                                  */}
        {/* ================================================= */}

        <div
          className="
            relative
            z-10

            mt-8

            hidden

            items-center
            justify-center
            gap-y-6

            lg:flex
            lg:flex-wrap
          "
        >
          {technologies.map((technology, index) => (
            <React.Fragment key={technology.id}>
              <TechnologyCard technology={technology} />

              {index !== technologies.length - 1 && (
                <AnimatedConnector direction="horizontal" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ================================================= */}
      {/* SECTION → SECTION CONNECTOR                       */}
      {/* ================================================= */}

      {showVerticalConnector && (
        <AnimatedConnector direction="vertical" />
      )}
    </>
  );
};

export default RoadmapSection;