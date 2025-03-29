import { Request, Response } from 'express';
import { UserService } from './UserService';

export class UserController {
  private service = new UserService();

  register = async (req: Request, res: Response): Promise<void> => {
    await this.service.register(req, res);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    await this.service.login(req, res);
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    await this.service.refreshToken(req, res);
  };

  logout = async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out' });
  };
}
