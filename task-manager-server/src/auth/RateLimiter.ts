import { Request, Response, NextFunction } from 'express';

const rateLimitMap: Record<string, { count: number; timestamp: number }> = {};
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000;

export class RateLimiter {
  limit(req: Request, res: Response, next: NextFunction): Promise<void> {
    const ip = req.ip || "";
    const now = Date.now();

    if (!rateLimitMap[ip]) {
      rateLimitMap[ip] = { count: 1, timestamp: now };
      next();
      return Promise.resolve();
    }

    const entry = rateLimitMap[ip];
    if (now - entry.timestamp > WINDOW_MS) {
      entry.count = 1;
      entry.timestamp = now;
      next();
      return Promise.resolve();
    }

    if (entry.count >= MAX_REQUESTS) {
      res.status(429).json({ error: 'Too many requests' });
      return Promise.resolve();
    }

    entry.count++;
    next();
    return Promise.resolve();
  }
}
