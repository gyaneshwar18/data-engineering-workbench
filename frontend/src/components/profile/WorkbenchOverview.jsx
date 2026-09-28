import {
  BarChart3,
  Database,
  GitBranch,
  Layers3,
  LineChart,
  PlaySquare,
  Server,
  Table2,
  Workflow,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";

const modules = [
  {
    title: "Dashboard",
    description:
      "Provides a high-level view of pipelines, datasets, metrics, and platform activity.",
    icon: BarChart3,
  },
  {
    title: "Pipelines",
    description:
      "Manage pipeline workflows, execution status, and operational activity.",
    icon: Workflow,
  },
  {
    title: "Datasets",
    description:
      "Upload, store, and work with datasets used throughout the platform.",
    icon: Database,
  },
  {
    title: "SQL Lab",
    description:
      "Execute SQL queries, inspect results, and analyze data interactively.",
    icon: Table2,
  },
  {
    title: "Metrics",
    description:
      "Surface analytical insights and visualize pipeline and data trends.",
    icon: LineChart,
  },
];

const architecture = [
  {
    title: "Data Sources",
    description: "CSV and structured data",
    icon: Database,
  },
  {
    title: "Ingestion",
    description: "Load data into the platform",
    icon: ArrowDown,
  },
  {
    title: "Pipelines",
    description: "Process and manage workflows",
    icon: Workflow,
  },
  {
    title: "SQL Lab",
    description: "Query and analyze data",
    icon: Table2,
  },
  {
    title: "Datasets",
    description: "Store and manage data",
    icon: Server,
  },
  {
    title: "Metrics & Analytics",
    description: "Generate useful insights",
    icon: LineChart,
  },
];

const technologies = [
  "Python",
  "FastAPI",
  "PostgreSQL",
  "React",
  "Tailwind CSS",
  "SQL",
  "Pandas",
];

export default function WorkbenchOverview() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-4
        shadow-sm
        sm:p-6
      "
    >
      {/* ================================================= */}
      {/* BACKGROUND GLOW                                  */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-cyan-500/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-56
          w-56
          rounded-full
          bg-blue-500/5
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* ================================================= */}
        {/* HEADER                                            */}
        {/* ================================================= */}

        <div className="flex items-start gap-3 sm:items-center sm:gap-4">

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
              border-cyan-500/20
              bg-cyan-500/10
              sm:h-11
              sm:w-11
            "
          >
            <Layers3
              size={20}
              className="text-cyan-400"
            />
          </div>

          <div className="min-w-0">

            <h2
              className="
                text-lg
                font-semibold
                tracking-tight
                text-white
                sm:text-xl
              "
            >
              Workbench Overview
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
              A unified workspace for data ingestion, pipeline management,
              SQL analysis, datasets, and analytics.
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* DIVIDER                                           */}
        {/* ================================================= */}

        <div
          className="
            my-5
            h-px
            bg-gradient-to-r
            from-cyan-500/20
            via-slate-700
            to-transparent
            sm:my-6
          "
        />

        {/* ================================================= */}
        {/* INTRO                                             */}
        {/* ================================================= */}

        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-950/50
            p-4
            sm:p-5
          "
        >

          <div className="flex items-start gap-3">

            <div
              className="
                mt-0.5
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-blue-500/10
                text-blue-400
              "
            >
              <PlaySquare size={17} />
            </div>

            <div>

              <h3 className="text-sm font-semibold text-white sm:text-base">
                What is the Workbench?
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                The Data Engineering Workbench brings common data engineering
                activities into one platform. It provides a central place to
                work with datasets, execute SQL, manage pipelines, and monitor
                analytical insights.
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* WORKFLOW                                          */}
        {/* ================================================= */}

        <div className="mt-7">

          <div className="mb-4">

            <h3 className="text-base font-semibold text-white">
              How the Workbench Fits Together
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              The modules work together as a simple data workflow.
            </p>

          </div>

          {/* Desktop Flow */}

          <div className="hidden overflow-x-auto pb-2 lg:block">

            <div className="flex min-w-max items-center">

              {architecture.map((item, index) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center"
                  >

                    <div
                      className="
                        w-[145px]
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-950/60
                        p-4
                        transition-all
                        duration-200
                        hover:border-cyan-500/30
                        hover:bg-slate-900
                      "
                    >

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-blue-500/20
                          bg-blue-500/10
                        "
                      >
                        <Icon
                          size={17}
                          className="text-blue-400"
                        />
                      </div>

                      <h4 className="mt-3 text-sm font-semibold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-[11px] leading-4 text-slate-500">
                        {item.description}
                      </p>

                    </div>

                    {index !== architecture.length - 1 && (
                      <div className="flex w-8 items-center justify-center">
                        <div
                          className="
                            h-px
                            w-full
                            bg-gradient-to-r
                            from-blue-500/20
                            via-cyan-400/60
                            to-blue-500/20
                          "
                        />
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>

          {/* Mobile / Tablet Flow */}

          <div className="lg:hidden">

            <div className="grid gap-2">

              {architecture.map((item, index) => {

                const Icon = item.icon;

                return (
                  <div key={item.title}>

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-950/60
                        p-3
                        sm:p-4
                      "
                    >

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-blue-500/10
                          text-blue-400
                        "
                      >
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0">

                        <h4 className="text-sm font-semibold text-white">
                          {item.title}
                        </h4>

                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>

                      </div>

                    </div>

                    {index !== architecture.length - 1 && (
                      <div className="flex h-5 items-center justify-center">
                        <div className="h-full w-px bg-gradient-to-b from-blue-500/30 via-cyan-400/60 to-blue-500/20" />
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* MODULES                                           */}
        {/* ================================================= */}

        <div className="mt-8">

          <div className="mb-4">

            <h3 className="text-base font-semibold text-white">
              Core Modules
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Each module focuses on a specific part of the data workflow.
            </p>

          </div>

          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >

            {modules.map((module) => {

              const Icon = module.icon;

              return (
                <div
                  key={module.title}
                  className="
                    group
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950/50
                    p-4
                    transition-all
                    duration-200
                    hover:border-cyan-500/25
                    hover:bg-slate-900/70
                  "
                >

                  <div className="flex items-start gap-3">

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-700
                        bg-slate-800/70
                      "
                    >
                      <Icon
                        size={17}
                        className="
                          text-cyan-400
                          transition-colors
                          group-hover:text-cyan-300
                        "
                      />
                    </div>

                    <div className="min-w-0">

                      <h4 className="text-sm font-semibold text-white">
                        {module.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {module.description}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* ================================================= */}
        {/* TECHNOLOGY STACK                                  */}
        {/* ================================================= */}

        <div className="mt-8">

          <div className="mb-4">

            <h3 className="text-base font-semibold text-white">
              Technology Stack
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Technologies used to build the platform.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            {technologies.map((technology) => (

              <span
                key={technology}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-slate-700
                  bg-slate-800/70
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-300
                  transition-all
                  duration-200
                  hover:border-cyan-500/30
                  hover:text-cyan-300
                "
              >
                <CheckCircle2
                  size={12}
                  className="text-cyan-400"
                />
                {technology}
              </span>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}