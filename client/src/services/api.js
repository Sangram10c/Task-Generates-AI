// import axios from "axios";

// const API_URL =
//   import.meta.env.VITE_API_URL || 'https://task-generates-ai.onrender.com/api' ;

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Specifications API
// export const generateSpecification = async (featureData) => {
//   const response = await api.post("/specifications/generate", featureData);
//   return response.data;
// };

// export const getRecentSpecifications = async () => {
//   const response = await api.get("/specifications/recent");
//   return response.data;
// };

// export const getSpecification = async (id) => {
//   const response = await api.get(`/specifications/${id}`);
//   return response.data;
// };

// export const updateSpecification = async (id, data) => {
//   const response = await api.put(`/specifications/${id}`, data);
//   return response.data;
// };

// export const deleteSpecification = async (id) => {
//   const response = await api.delete(`/specifications/${id}`);
//   return response.data;
// };

// // Status API
// export const getSystemStatus = async () => {
//   const response = await api.get("/status");
//   return response.data;
// };

// export default api;

import axios from 'axios';

// This will use the environment variable from Vercel
const API_URL = window.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'https://task-generates-ai.onrender.com/api';

console.log('🔗 API URL:', API_URL); // This will help debug

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Important for CORS
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    console.error('URL:', error.config?.url);
    console.error('Status:', error.response?.status);
    return Promise.reject(error);
  }
);

// Specifications API
export const generateSpecification = async (featureData) => {
  const response = await api.post('/specifications/generate', featureData);
  return response.data;
};

export const getRecentSpecifications = async () => {
  const response = await api.get('/specifications/recent');
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
  const response = await api.get('/status');
  return response.data;
};

export default api;