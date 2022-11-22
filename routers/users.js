import express from 'express';
import { UserService } from '../services/users.js';

const router = express.Router();

router.post('/users', async (req, res) => {
  const users = new UserService();

  res.sendPromise(users.addUser(req.body));
});

router.get('/users', async (req, res) => {
  const { page, pageSize } = req.query;
  console.log('Page', page, pageSize);
  const users = new UserService();

  res.sendPromise(users.getAllUsers(page, pageSize));
});

router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const users = new UserService();

  res.sendPromise(users.getUserById(userId));
});

router.put('/users/:userId', async (req, res) => {});
router.delete('/users/:userId', async (req, res) => {});

export { router as userRouter };