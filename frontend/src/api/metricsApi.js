export const getPipelineAnalytics = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/metrics/pipeline-analytics`
  );

  return res.data;
};