import axios from 'axios';
import { environment  } from 'src/environments/environment';

function isTokenAboutToExpire(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp - now < 60; 
  } catch {
    return true; 
  }
}

const API = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true 
});

API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token && isTokenAboutToExpire(token)) {
      try {
        const res = await axios.post(`${environment.apiUrl}/refresh-token`, {}, { withCredentials: true });
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);
        config.headers['Authorization'] = `Bearer ${newToken}`;
      } catch (err) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    } else if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
