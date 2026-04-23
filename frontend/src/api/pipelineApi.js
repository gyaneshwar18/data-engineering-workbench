import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPipelineLogs = async (pipelineId) => {
  const res = await axios.get(`${BASE_URL}/pipelines/${pipelineId}/logs`);
  return res.data;
};