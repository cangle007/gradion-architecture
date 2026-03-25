import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or pull from context/state
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
