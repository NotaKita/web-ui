import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    const res = await apiClient.post('/auth/login', { username, password });
    return res.data;
  },
  register: async (username: string, password: string) => {
    const res = await apiClient.post('/auth/register', { username, password });
    return res.data;
  },
  me: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
  logout: async () => {
    const res = await apiClient.post('/auth/logout');
    return res.data;
  },
};

// Company API
export const companyAPI = {
  create: async (data: any) => {
    const res = await apiClient.post('/company', data);
    return res.data;
  },
  list: async () => {
    const res = await apiClient.get('/company');
    return res.data;
  },
  get: async () => {
    const res = await apiClient.get('/company');
    return res.data;
  },
  getById: async (id: string) => {
    const res = await apiClient.get(`/company/${id}`);
    return res.data;
  },
  update: async (id: string, data: any) => {
    const res = await apiClient.put(`/company/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await apiClient.delete(`/company/${id}`);
    return res.data;
  },
};

// Invoice API
export const invoiceAPI = {
  create: async (data: any) => {
    const res = await apiClient.post('/invoice', data);
    return res.data;
  },
  list: async (companyId?: string) => {
    const url = companyId ? `/invoice?company_id=${companyId}` : '/invoice';
    const res = await apiClient.get(url);
    return res.data;
  },
};

export default apiClient;
