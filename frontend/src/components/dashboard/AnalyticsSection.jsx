import PipelineTrendChart from "./PipelineTrendChart";
import QueryChart from "../QueryChart";

export default function AnalyticsSection({
  pipelineTrends,
  performance,
  metrics,
}) {
  return (
    <div className="space-y-6">

      {/* Pipeline Trend */}

      <PipelineTrendChart
        data={pipelineTrends}
      />

      {/* Bottom Analytics */}

      <div className="grid grid-cols-12 gap-6">

        {/* Query Analytics */}

        <div className="col-span-12 xl:col-span-8">

          <QueryChart
            data={performance?.queries_per_day}
            metrics={metrics}
          />

        </div>

        {/* Execution Trend Placeholder */}

        <div className="col-span-12 xl:col-span-4">

          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-slate-700
              bg-slate-900/40

              h-full
              min-h-[420px]

              flex
              items-center
              justify-center

              text-slate-500
            "
          >
            Execution Trend
            <br />
            (Coming Next)
          </div>

        </div>

      </div>

    </div>
  );
}