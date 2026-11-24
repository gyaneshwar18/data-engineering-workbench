import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60_000,
});

const backendWarmup = apiClient.get("/health").catch(() => null);

apiClient.interceptors.request.use(async (config) => {
  if (config.url !== "/health") {
    await backendWarmup;
  }

  return config;
});

export default apiClient;
