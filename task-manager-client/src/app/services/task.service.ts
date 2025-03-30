import { Injectable } from '@angular/core';
import API from '../utils/axios-instance';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  async getTasks() {
    const res = await API.get(`/tasks`);
    return res.data;
  }

  async createTask(title: string, description: string) {
    const res = await API.post(`/tasks`, { title, description });
    return res.data.task;
  }

  async updateTask(id: string, title: string, description: string) {
    await API.put(`/tasks/${id}`, { title, description });
  }

  async deleteTask(id: string) {
    await API.delete(`/tasks/${id}`);
  }
}
