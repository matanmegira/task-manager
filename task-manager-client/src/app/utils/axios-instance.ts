import axios from 'axios';
import { environment  } from 'src/environments/environment';
const API = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${environment.apiUrl}/refresh-token`, {}, { withCredentials: true });
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
