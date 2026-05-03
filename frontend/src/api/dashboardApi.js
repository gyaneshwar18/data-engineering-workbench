import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;


export const getTopSlowQueries = async () => {
  const res = await axios.get(
    `${API}/metrics/analytics/top-slow-queries`
  );

  return res.data;
};