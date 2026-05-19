import axios from 'axios';
import { getAuthCookie } from '../utils/cookies'; 

const api = axios.create({
  baseURL: '/v1/core',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthCookie(); 
    
    if (token && config.headers) {
      // Verifica se a palavra 'Bearer' já veio do cookie. Se sim, usa direto. Se não, adiciona.
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;