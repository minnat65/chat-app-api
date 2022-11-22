import express from 'express';
import { MessageService } from '../services/message.js';

const router = express.Router();

router.post('/message', async (req, res) => {
  const msgBody = req.body;
  const msg = new MessageService();

  res.sendPromise(msg.createMessage(msgBody));
})

router.get('/message', async (req, res) => {
  const { userId, groupId } = req.query;
  const msg = new MessageService();

  res.sendPromise(msg.getAllMessageofGroup(userId, groupId));
})

router.get('/message/:userId', async (req, res) => {
  const { userId } = req.params;
  const { groupId } = req.query;
  const msg = new MessageService();

  res.sendPromise(msg.getMessagesByGroupId(userId, groupId));
})

export { router as messageRouter };