import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', canActivate: [guestGuard],loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'tasks', canActivate: [authGuard], loadComponent: () => import('./components/task/task.component').then(m => m.TaskComponent) },
  { path: '**', redirectTo: 'login' }
];
