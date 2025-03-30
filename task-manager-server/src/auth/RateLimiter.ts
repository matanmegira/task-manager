import { Request, Response, NextFunction } from 'express';

const rateLimitMap: Record<string, { count: number; timestamp: number }> = {};
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000;

export class RateLimiter {
  limit(req: Request, res: Response, next: NextFunction): void {
    const ip = req.ip || '';
    const now = Date.now();
  
    if (!rateLimitMap[ip]) {
      rateLimitMap[ip] = { count: 1, timestamp: now };
      return next();
    }
  
    const entry = rateLimitMap[ip];
    if (now - entry.timestamp > WINDOW_MS) {
      entry.count = 1;
      entry.timestamp = now;
      return next();
    }
  
    if (entry.count >= MAX_REQUESTS) {
      res.status(429).json({ error: 'Too many requests' });
      return;
    }
  
    entry.count++;
    return next();
  }
  
}
