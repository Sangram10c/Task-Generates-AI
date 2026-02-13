import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specifications API
export const generateSpecification = async (featureData) => {
  const response = await api.post("/specifications/generate", featureData);
  return response.data;
};

export const getRecentSpecifications = async () => {
  const response = await api.get("/specifications/recent");
  return response.data;
};

export const getSpecification = async (id) => {
  const response = await api.get(`/specifications/${id}`);
  return response.data;
};

export const updateSpecification = async (id, data) => {
  const response = await api.put(`/specifications/${id}`, data);
  return response.data;
};

export const deleteSpecification = async (id) => {
  const response = await api.delete(`/specifications/${id}`);
  return response.data;
};

// Status API
export const getSystemStatus = async () => {
  const response = await api.get("/status");
  return response.data;
};

export default api;
