import axios from 'axios';
import { API_URL, TOKEN_KEY } from './constants';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Adjunta el Bearer token en cada request si existe
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Limpia sesión si el backend responde 401
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
       const message = error.response?.data?.message ?? '';
      if (!message.includes('token expired')) {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;