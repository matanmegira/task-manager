import express from 'express';
import { UserController } from './users/UserController';
import { TaskController } from './tasks/TaskController';
import { RateLimiter } from './auth/RateLimiter';
import { authenticate } from './auth/AuthMiddleware';
import { AuthenticatedRequest } from './types/AuthenticatedRequest';


const router = express.Router();

const userController = new UserController();
const taskController = new TaskController();
const rateLimiter = new RateLimiter();

router.post('/register', userController.register);
router.post('/login', rateLimiter.limit, userController.login);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);

router.get('/tasks', authenticate,   (req, res) => taskController.getTasks(req as AuthenticatedRequest, res));
router.post('/tasks', authenticate, (req, res) => taskController.createTask(req as AuthenticatedRequest, res));
router.put('/tasks/:id', authenticate, (req, res) => taskController.updateTask(req as AuthenticatedRequest, res));
router.delete('/tasks/:id', authenticate, (req, res) => taskController.deleteTask(req as AuthenticatedRequest, res));

export default router;