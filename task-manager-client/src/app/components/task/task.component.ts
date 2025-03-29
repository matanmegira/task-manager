import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

interface Task {
  id: string;
  title: string;
  description: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask = { title: '', description: '' };
  originalTasks: { [id: string]: Task } = {};

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.tasks = await this.taskService.getTasks();
    } catch {
      this.snackBar.open('Failed to load tasks ❌', 'Close', { duration: 3000 });
    }
  }

  async addTask(form?: NgForm) {
    if (!this.newTask.title || !this.newTask.description) return;
    try {
      const created = await this.taskService.createTask(this.newTask.title, this.newTask.description);
      this.tasks.push(created);
      this.newTask.title = '';
      this.newTask.description = '';
      form?.resetForm(this.newTask);
      this.snackBar.open('Task added ✅', 'Close', { duration: 3000 });
    } catch {
      this.snackBar.open('Failed to add task ❌', 'Close', { duration: 3000 });
    }
  }

  async updateTask(task: Task) {
    if (!task.title || !task.description) return;
    try {
      await this.taskService.updateTask(task.id, task.title, task.description);
      task.isEditing = false;
      delete this.originalTasks[task.id];
      this.snackBar.open('Task updated ✅', 'Close', { duration: 3000 });
    } catch {
      this.snackBar.open('Failed to update task ❌', 'Close', { duration: 3000 });
    }
  }

  async deleteTask(id: string) {
    try {
      await this.taskService.deleteTask(id);
      this.tasks = this.tasks.filter(task => task.id !== id);
      delete this.originalTasks[id];
      this.snackBar.open('Task deleted 🗑️', 'Close', { duration: 3000 });
    } catch {
      this.snackBar.open('Failed to delete task ❌', 'Close', { duration: 3000 });
    }
  }

  startEdit(task: Task) {
    this.originalTasks[task.id] = { ...task };
    task.isEditing = true;
  }

  cancelEdit(task: Task) {
    const original = this.originalTasks[task.id];
    if (original) {
      task.title = original.title;
      task.description = original.description;
      task.isEditing = false;
      delete this.originalTasks[task.id];
    }
  }

  async logout() {
    await this.authService.logout();
    this.snackBar.open('Logged out 👋', 'Close', { duration: 3000 });
    this.router.navigate(['/login']);
  }
}
