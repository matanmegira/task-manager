import { Response } from 'express';
import { EncryptionService } from '../security/EncryptionService';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

const tasks: Record<string, any[]> = {};

export class TaskService {
  private encryption = new EncryptionService();

  getTasks(req: AuthenticatedRequest, res: Response) {
    const username = req.username;
    const raw = tasks[username] || [];
    const decrypted = raw.map(t => ({
      ...t,
      description: this.encryption.decrypt(t.description)
    }));
    res.json(decrypted);
  }

  createTask(req: AuthenticatedRequest, res: Response) {
    const username = req.username;
    const { title, description } = req.body;
    if (!username || !title || !description) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const task = {
      id: uuidv4(),
      title,
      description: this.encryption.encrypt(description),
      username
    };

    if (!tasks[username]) tasks[username] = [];
    tasks[username].push(task);

    res.status(201).json({
      message: 'Task created',
      task: {
        ...task,
        description 
      }
    });
  }

  updateTask(req: AuthenticatedRequest, res: Response) {
    const username = req.username || "";
    const { title, description } = req.body;
    const taskList = tasks[username] || [];
    const task = taskList.find(t => t.id === req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.title = title;
    task.description = this.encryption.encrypt(description);

    res.json({
      message: 'Task updated',
      task: {
        ...task,
        description 
      }
    });
  }

  deleteTask(req: AuthenticatedRequest, res: Response) {
    const username = req.username;
    tasks[username] = (tasks[username] || []).filter(t => t.id !== req.params.id);
    res.json({ message: 'Task deleted' });
  }
}
