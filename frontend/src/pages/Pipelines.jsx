import { useEffect, useState } from "react";
import axios from "axios";

import {
  createPipeline,
  getPipelineLogs,
} from "../api/pipelineApi";

import PipelineCard from "../components/Pipelines/PipelineCard";
import PipelineLogsModal from "../components/Pipelines/PipelineLogsModal";
import PipelineRunHistoryModal from "../components/Pipelines/PipelineRunHistoryModal";
import CreatePipelineDialog from "../components/Pipelines/CreatePipelineDialog";

import MetricsBar from "../components/ui/MetricsBar";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";

export default function Pipelines() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [runningPipelineId, setRunningPipelineId] =
    useState(null);

  const [creatingPipeline, setCreatingPipeline] =
    useState(false);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [logsOpen, setLogsOpen] =
    useState(false);

  const [logsData, setLogsData] =
    useState(null);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [selectedPipelineId, setSelectedPipelineId] =
    useState(null);

  const [error, setError] =
    useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchPipelines();
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Fetch Pipelines                                                        */
  /* ---------------------------------------------------------------------- */

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${API}/pipelines`
      );

      setPipelines(res.data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load pipelines."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Create Pipeline                                                        */
  /* ---------------------------------------------------------------------- */

  const handleCreatePipeline = async (
    pipelineData
  ) => {
    try {
      setCreatingPipeline(true);
      setError(null);

      await createPipeline(
        pipelineData
      );

      setCreateOpen(false);

      await fetchPipelines();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to create pipeline."
      );
    } finally {
      setCreatingPipeline(false);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Run Pipeline                                                           */
  /* ---------------------------------------------------------------------- */

  const runPipeline = async (
    pipelineId
  ) => {
    try {
      setRunningPipelineId(
        pipelineId
      );

      setError(null);

      await axios.post(
        `${API}/pipelines/run/${pipelineId}`
      );

      await fetchPipelines();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Pipeline execution failed."
      );
    } finally {
      setRunningPipelineId(null);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Logs                                                                   */
  /* ---------------------------------------------------------------------- */

  const handleViewLogs = async (
    pipelineId
  ) => {
    try {
      setError(null);

      const data =
        await getPipelineLogs(
          pipelineId
        );

      setLogsData(data);
      setLogsOpen(true);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load pipeline logs."
      );
    }
  };

  /* ---------------------------------------------------------------------- */
  /* History                                                                */
  /* ---------------------------------------------------------------------- */

  const handleViewHistory = (
    pipelineId
  ) => {
    setSelectedPipelineId(
      pipelineId
    );

    setHistoryOpen(true);
  };

  /* ---------------------------------------------------------------------- */
  /* Display Status                                                         */
  /* ---------------------------------------------------------------------- */

  const getPipelineWithDisplayStatus = (
    pipeline
  ) => {
    if (
      runningPipelineId ===
      pipeline.id
    ) {
      return {
        ...pipeline,
        status: "running",
      };
    }

    return pipeline;
  };

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <div
      className="
        min-w-0
        w-full
        px-4
        py-4
        text-white

        sm:px-5
        sm:py-5

        md:px-6
        md:py-5

        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          min-w-0
          max-w-[1400px]
        "
      >
        {/* ================================================================
            HEADER
        ================================================================ */}

        <PageHeader
          title="Pipelines"
          subtitle="Manage and monitor your data pipelines"
          action={
            <div
              className="
                flex
                w-full
                min-w-0
                flex-col
                gap-2

                sm:w-auto
                sm:flex-row
                sm:items-center
                sm:gap-3
              "
            >
              {/* ----------------------------------------------------------
                  Refresh
              ---------------------------------------------------------- */}

              <button
                type="button"
                onClick={fetchPipelines}
                disabled={loading}
                className="
                  inline-flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-700
                  bg-slate-900/60
                  px-3
                  text-sm
                  font-medium
                  text-slate-300
                  transition-colors
                  duration-150

                  hover:border-slate-600
                  hover:bg-slate-800
                  hover:text-white

                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/30

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  sm:w-auto
                "
              >
                <span
                  className="
                    mr-1.5
                    text-base
                    leading-none
                  "
                  aria-hidden="true"
                >
                  ↻
                </span>

                Refresh
              </button>

              {/* ----------------------------------------------------------
                  Create Pipeline
              ---------------------------------------------------------- */}

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setCreateOpen(true);
                }}
                className="
                  inline-flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-600
                  px-4
                  text-sm
                  font-medium
                  text-white
                  transition-colors
                  duration-150

                  hover:bg-blue-500

                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/40

                  sm:w-auto
                "
              >
                <span
                  className="
                    mr-1.5
                    text-base
                    leading-none
                  "
                  aria-hidden="true"
                >
                  +
                </span>

                Create Pipeline
              </button>
            </div>
          }
        />

        {/* ================================================================
            ERROR
        ================================================================ */}

        {error && (
          <div
            role="alert"
            className="
              mb-4
              min-w-0
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-3.5
              py-3
              text-xs
              leading-5
              text-red-400

              sm:mb-5
              sm:px-4
              sm:text-sm
            "
          >
            {error}
          </div>
        )}

        {/* ================================================================
            METRICS
        ================================================================ */}

        {!loading &&
          pipelines.length > 0 && (
            <div
              className="
                mb-5
                min-w-0

                sm:mb-6
              "
            >
              <MetricsBar
                pipelines={pipelines}
              />
            </div>
          )}

        {/* ================================================================
            EMPTY STATE
        ================================================================ */}

        {!loading &&
          pipelines.length === 0 && (
            <div className="min-w-0">
              <EmptyState
                title="No Pipelines Found"
                description="Create your first pipeline to start processing data."
              />
            </div>
          )}

        {/* ================================================================
            LOADING
        ================================================================ */}

        {loading && (
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-4

              md:grid-cols-2
              md:gap-5
            "
          >
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="min-w-0"
                >
                  <LoadingSkeleton />
                </div>
              )
            )}
          </div>
        )}

        {/* ================================================================
            PIPELINE CARDS
        ================================================================ */}

        {!loading &&
          pipelines.length > 0 && (
            <div
              className="
                grid
                min-w-0
                grid-cols-1
                gap-4

                md:grid-cols-2
                md:gap-5
              "
            >
              {pipelines.map(
                (pipeline) => (
                  <div
                    key={pipeline.id}
                    className="
                      min-w-0
                      w-full
                    "
                  >
                    <PipelineCard
                      pipeline={getPipelineWithDisplayStatus(
                        pipeline
                      )}
                      running={
                        runningPipelineId ===
                        pipeline.id
                      }
                      onRun={
                        runPipeline
                      }
                      onLogs={
                        handleViewLogs
                      }
                      onHistory={
                        handleViewHistory
                      }
                    />
                  </div>
                )
              )}
            </div>
          )}

        {/* ================================================================
            CREATE PIPELINE DIALOG
        ================================================================ */}

        <CreatePipelineDialog
          isOpen={createOpen}
          onClose={() =>
            setCreateOpen(false)
          }
          onCreate={
            handleCreatePipeline
          }
          creating={
            creatingPipeline
          }
        />

        {/* ================================================================
            LOGS
        ================================================================ */}

        <PipelineLogsModal
          isOpen={logsOpen}
          onClose={() =>
            setLogsOpen(false)
          }
          logsData={logsData}
        />

        {/* ================================================================
            HISTORY
        ================================================================ */}

        <PipelineRunHistoryModal
          isOpen={historyOpen}
          onClose={() =>
            setHistoryOpen(false)
          }
          pipelineId={
            selectedPipelineId
          }
        />
      </div>
    </div>
  );
}