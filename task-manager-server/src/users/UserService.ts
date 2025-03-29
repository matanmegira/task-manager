import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { TokenService } from '../auth/TokenService';

const users: Record<string, { password: string }> = {};

export class UserService {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    if (users[username]) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    users[username] = { password: hashed };
    const tokenService = new TokenService();
    const accessToken = tokenService.generateAccessToken(username);
    const refreshToken = tokenService.generateRefreshToken(username);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, sameSite: 'strict', secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(201).json({ token: accessToken });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const tokenService = new TokenService();
    const accessToken = tokenService.generateAccessToken(username);
    const refreshToken = tokenService.generateRefreshToken(username);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, sameSite: 'strict', secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ token: accessToken });
  }

  refreshToken(req: Request, res: Response) {
    const tokenService = new TokenService();
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });
  
    try {
      const newAccessToken = tokenService.generateAccessTokenFromRefresh(token);
      res.json({ token: newAccessToken });
    } catch {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
}