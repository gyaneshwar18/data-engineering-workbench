import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const getDatasets = async () => {
  const res = await axios.get(`${API}/datasets`);
  return res.data;
};

export const getDatasetPreview = async (tableName) => {
  const res = await axios.get(
    `${API}/datasets/${tableName}`
  );
  return res.data;
};

export const getDatasetSchema = async (tableName) => {
  const res = await axios.get(
    `${API}/datasets/${tableName}/schema`
  );
  return res.data;
};