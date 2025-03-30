import { Request, Response } from 'express';
import { TaskService } from './TaskService';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export class TaskController {
  private taskService = new TaskService();

  getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    await this.taskService.getTasks(req, res);
  };

  createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    await this.taskService.createTask(req, res);
  };

  updateTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    await this.taskService.updateTask(req, res);
  };

  deleteTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    await this.taskService.deleteTask(req, res);
  };
}
