import apiClient from "./httpClient";

export const getPipelineAnalytics = async () => {
  const res = await apiClient.get(
    "/metrics/pipeline-analytics"
  );

  return res.data;
};
