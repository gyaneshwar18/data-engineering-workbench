import axios from "axios";
import apiClient from "./httpClient";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPipeline = async (pipelineData) => {
  const res = await axios.post(
    `${BASE_URL}/pipelines/create`,
    pipelineData
  );

  return res.data;
};

export const getPipelineLogs = async (pipelineId) => {
  const res = await apiClient.get(
    `/pipelines/${pipelineId}/logs`
  );
  return res.data;
};

export const getPipelineRuns = async (pipelineId) => {
  const res = await apiClient.get(
    `/pipelines/${pipelineId}/runs`
  );
  return res.data;
};

export const getRunLogs = async (runId) => {
  const res = await apiClient.get(
    `/pipeline-runs/${runId}/logs`
  );
  return res.data;
};

