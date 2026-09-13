import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";

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

  const [runFeedback, setRunFeedback] =
    useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchPipelines();
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Fetch Pipelines                                                        */
  /* ---------------------------------------------------------------------- */

  const fetchPipelines = async ({
    showLoading = true,
  } = {}) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

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
      if (showLoading) {
        setLoading(false);
      }
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

      await fetchPipelines({
        showLoading: false,
      });
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
    const selectedPipeline =
      pipelines.find(
        (pipeline) =>
          pipeline.id === pipelineId
      );

    const pipelineName =
      selectedPipeline?.name ||
      "Pipeline";

    try {
      setError(null);

      /*
        Important:
        Do NOT set the page-level loading state here.

        The user should remain at the exact position
        where they clicked Run.
      */

      setRunningPipelineId(
        pipelineId
      );

      setRunFeedback({
        type: "running",
        pipelineName,
      });

      await axios.post(
        `${API}/pipelines/run/${pipelineId}`
      );

      /*
        Refresh the data without replacing the
        existing cards with loading skeletons.
      */

      await fetchPipelines({
        showLoading: false,
      });

      setRunFeedback({
        type: "success",
        pipelineName,
      });
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.detail ||
        "Pipeline execution failed.";

      setError(message);

      setRunFeedback({
        type: "error",
        pipelineName,
        message,
      });
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
          subtitle={
            <>
              <span className="hidden sm:inline">
                Manage and monitor your data pipelines
              </span>

              <span className="sm:hidden">
                Manage your pipelines
              </span>
            </>
          }
          action={
            <div
              className="
        flex
        w-full
        min-w-0
        items-center
        justify-end
        gap-2

        sm:w-auto
        sm:flex-row
        sm:gap-3
      "
            >
              {/* Refresh */}

              <button
                type="button"
                onClick={() => fetchPipelines()}
                disabled={loading}
                aria-label="Refresh pipelines"
                title="Refresh pipelines"
                className="
          inline-flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-slate-700
          bg-slate-900/60
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
          sm:gap-2
          sm:px-3
        "
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin" : ""}
                />

                <span className="hidden sm:inline">
                  Refresh
                </span>
              </button>

              {/* Create */}

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setCreateOpen(true);
                }}
                className="
          inline-flex
          h-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-600
          px-3
          text-sm
          font-medium
          text-white
          transition-colors
          duration-150

          hover:bg-blue-500

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500/40

          sm:px-4
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

                <span className="sm:hidden">
                  Create
                </span>

                <span className="hidden sm:inline">
                  Create Pipeline
                </span>
              </button>
            </div>
          }
        />
        {/* ================================================================
            RUN FEEDBACK
        ================================================================ */}

        {runFeedback && (
          <div
            className={`
              mb-4
              flex
              min-w-0
              items-start
              gap-3
              rounded-xl
              border
              px-3.5
              py-3

              sm:mb-5
              sm:items-center
              sm:px-4

              ${runFeedback.type ===
                "running"
                ? `
                      border-blue-500/20
                      bg-blue-500/10
                      text-blue-300
                    `
                : runFeedback.type ===
                  "success"
                  ? `
                        border-emerald-500/20
                        bg-emerald-500/10
                        text-emerald-300
                      `
                  : `
                        border-red-500/20
                        bg-red-500/10
                        text-red-300
                      `
              }
            `}
          >
            {/* Icon */}

            <div className="mt-0.5 shrink-0 sm:mt-0">
              {runFeedback.type ===
                "running" && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

              {runFeedback.type ===
                "success" && (
                  <CheckCircle2
                    size={17}
                  />
                )}

              {runFeedback.type ===
                "error" && (
                  <AlertCircle
                    size={17}
                  />
                )}
            </div>

            {/* Message */}

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-xs
                  font-semibold

                  sm:text-sm
                "
              >
                {runFeedback.type ===
                  "running" &&
                  `Running ${runFeedback.pipelineName}`}

                {runFeedback.type ===
                  "success" &&
                  `${runFeedback.pipelineName} completed successfully`}

                {runFeedback.type ===
                  "error" &&
                  `${runFeedback.pipelineName} failed`}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  opacity-70

                  sm:text-xs
                "
              >
                {runFeedback.type ===
                  "running" &&
                  "Pipeline execution is in progress."}

                {runFeedback.type ===
                  "success" &&
                  "Pipeline execution finished just now."}

                {runFeedback.type ===
                  "error" &&
                  runFeedback.message}
              </p>
            </div>

            {/* Close */}

            <button
              type="button"
              onClick={() =>
                setRunFeedback(null)
              }
              aria-label="Dismiss pipeline status"
              className="
                shrink-0
                rounded-md
                p-1
                opacity-60
                transition-opacity
                hover:opacity-100
              "
            >
              <X size={15} />
            </button>
          </div>
        )}

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
            INITIAL LOADING ONLY
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