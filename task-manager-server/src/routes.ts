import express from 'express';
import { UserController } from './users/UserController';
import { TaskController } from './tasks/TaskController';
import { RateLimiter } from './auth/RateLimiter';
import { authenticate } from './auth/AuthMiddleware';


const router = express.Router();

const userController = new UserController();
const taskController = new TaskController();
const rateLimiter = new RateLimiter();

router.post('/register', userController.register);
router.post('/login', rateLimiter.limit, userController.login);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);

router.get('/tasks', authenticate, taskController.getTasks);
router.post('/tasks', authenticate, taskController.createTask);
router.put('/tasks/:id', authenticate, taskController.updateTask);
router.delete('/tasks/:id', authenticate, taskController.deleteTask);

export default router;