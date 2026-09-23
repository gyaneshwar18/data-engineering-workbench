import React from "react";

const AnimatedConnector = ({
  direction = "horizontal",
  reverse = false,
}) => {
  /* ===================================================== */
  /* VERTICAL CONNECTOR                                    */
  /* ===================================================== */

  if (direction === "vertical") {
    return (
      <div
        className="
          relative
          mx-auto

          flex
          h-8
          w-6

          items-center
          justify-center

          overflow-hidden
        "
      >
        {/* Line */}

        <div
          className="
            h-full
            w-px

            bg-gradient-to-b
            from-blue-500/20
            via-cyan-400/70
            to-cyan-400/20
          "
        />

        {/* Animated Dot */}

        <div
          className="
            absolute
            left-1/2

            h-2
            w-2

            -translate-x-1/2

            rounded-full

            bg-cyan-400

            shadow-[0_0_14px_rgba(34,211,238,0.9)]

            animate-roadmap-dot-vertical
          "
        />
      </div>
    );
  }

  /* ===================================================== */
  /* HORIZONTAL CONNECTOR                                  */
  /* ===================================================== */

  return (
    <div
      className={`
        relative

        flex
        h-6
        w-8

        shrink-0

        items-center
        justify-center

        overflow-hidden

        ${reverse ? "-scale-x-100" : ""}
      `}
    >
      {/* Line */}

      <div
        className="
          h-px
          w-full

          bg-gradient-to-r
          from-blue-500/20
          via-cyan-400/70
          to-blue-500/20
        "
      />

      {/* Animated Dot */}

      <div
        className="
          absolute

          h-2
          w-2

          rounded-full

          bg-cyan-400

          shadow-[0_0_14px_rgba(34,211,238,0.9)]

          animate-roadmap-dot-horizontal
        "
      />
    </div>
  );
};

export default AnimatedConnector;