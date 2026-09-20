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
  const {
    name,
    description,
    logo,
    status,
  } = technology;

  return (
    <div
      className="
        group
        relative
        w-full
        min-w-0

        rounded-2xl

        border
        border-blue-500/20

        bg-[#0b1220]

        backdrop-blur-xl

        p-3.5

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-blue-400/40
        hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]

        sm:p-4

        lg:w-[150px]
        lg:min-w-[150px]
      "
    >
      {/* ================================================= */}
      {/* SOFT GLOW                                        */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          rounded-2xl

          bg-gradient-to-br
          from-blue-500/5
          via-transparent
          to-transparent

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      {/* ================================================= */}
      {/* LOGO                                              */}
      {/* ================================================= */}

      <div
        className="
          relative
          flex
          h-11
          items-center
          justify-center

          sm:h-12
        "
      >
        <img
          src={logo}
          alt={name}
          className="
            h-10
            w-10
            object-contain

            sm:h-12
            sm:w-12
          "
          draggable={false}
        />
      </div>

      {/* ================================================= */}
      {/* NAME                                              */}
      {/* ================================================= */}

      <h3
        className="
          relative

          mt-3

          truncate

          text-center
          text-xs
          font-semibold
          text-white

          sm:mt-4
          sm:text-sm
        "
      >
        {name}
      </h3>

      {/* ================================================= */}
      {/* DESCRIPTION                                       */}
      {/* ================================================= */}

      <p
        className="
          relative

          mt-1

          min-h-[20px]

          text-center

          text-[10px]
          leading-4

          text-slate-400

          sm:text-xs
          sm:leading-5
        "
      >
        {description}
      </p>

      {/* ================================================= */}
      {/* STATUS                                            */}
      {/* ================================================= */}

      <div
        className="
          relative

          mt-3

          flex
          justify-center

          sm:mt-4
        "
      >
        <span
          className={`
            rounded-full

            px-2.5
            py-1

            text-[9px]
            font-semibold
            tracking-wide

            sm:px-3
            sm:text-[10px]

            ${statusStyles[status]}
          `}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default TechnologyCard;