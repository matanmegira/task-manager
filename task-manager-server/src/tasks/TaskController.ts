import { Request, Response } from 'express';
import { TaskService } from './TaskService';

export class TaskController {
  private service = new TaskService();

  getTasks = async (req: Request, res: Response): Promise<void> => {
    await this.service.getTasks(req, res);
  };

  createTask = async (req: Request, res: Response): Promise<void> => {
    await this.service.createTask(req, res);
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    await this.service.updateTask(req, res);
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    await this.service.deleteTask(req, res);
  };
}
