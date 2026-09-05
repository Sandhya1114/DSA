import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE_URL });

export const analyzePR = (prUrl) => api.post('/pr/analyze', { prUrl }).then((res) => res.data);

export const getHistory = () => api.get('/pr/history').then((res) => res.data);

export const getAnalysisById = (id) => api.get(`/pr/${id}`).then((res) => res.data);

export default api;
