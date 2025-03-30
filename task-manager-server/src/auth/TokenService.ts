import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const SECRET = config.jwtSecret;
export class TokenService {
  generateAccessToken(username: string) {
    return jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  }

  generateRefreshToken(username: string) {
    return jwt.sign({ username }, SECRET, { expiresIn: '7d' });
  }

  generateAccessTokenFromRefresh(refreshToken: string): string {
    const decoded = jwt.verify(refreshToken, config.jwtSecret) as { username: string };
    return this.generateAccessToken(decoded.username);
  }
}