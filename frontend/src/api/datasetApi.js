import axios from "axios";
import apiClient from "./httpClient";

const API = import.meta.env.VITE_API_BASE_URL;

export const getDatasets = async () => {
  const res = await apiClient.get("/datasets");
  return res.data;
};

export const getDatasetPreview = async (tableName) => {
  const res = await apiClient.get(`/datasets/${tableName}`);

  return res.data;
};

export const getDatasetSchema = async (tableName) => {
  const res = await apiClient.get(`/datasets/${tableName}/schema`);

  return res.data;
};

export const getDatasetStats = async (tableName) => {
  const res = await apiClient.get(`/datasets/${tableName}/stats`);

  return res.data;
};

export const exportDataset = async (tableName) => {
  window.open(
    `${API}/datasets/${tableName}/export`,
    "_blank"
  );
};


// 🔥 UPLOAD DATASET
export const uploadDataset = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const res = await axios.post(
    `${API}/datasets/upload`,
    formData
  );

  return res.data;
};
