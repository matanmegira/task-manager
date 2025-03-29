import { Injectable } from '@angular/core';
import axios from 'axios';
import API from '../utils/axios-instance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async register(username: string, password: string) {
    const res =  await axios.post(`${environment.apiUrl}/register`, { username, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res;
  }

  async login(username: string, password: string) {
    const res = await axios.post(`${environment.apiUrl}/login`, { username, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res;
  }

  async logout() {
    await axios.post(`${environment.apiUrl}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
