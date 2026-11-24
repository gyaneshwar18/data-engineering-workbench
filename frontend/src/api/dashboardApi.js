import apiClient from "./httpClient";

export const getTopSlowQueries = async () => {
  const res = await apiClient.get(
    "/metrics/analytics/top-slow-queries"
  );

  return res.data;
};

export const getRecentActivity = async () => {
  const res = await apiClient.get(
    "/dashboard/recent-activity"
  );

  return res.data;
};
