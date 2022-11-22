import express from 'express';
import { GroupService } from '../services/chat-group.js';

const router = express.Router();

router.post('/groups', async (req, res) => {
  const groupBody = req.body;
  const group = new GroupService();

  res.sendPromise(group.createGroup(groupBody));
});

router.get('/groups', async (req, res) => {
  const { userId, page } = req.query;
  const group = new GroupService();

  res.sendPromise(group.getAllGroups(userId, page));
});

router.get('/groups/:groupId', async (req, res) => {
  const { groupId} = req.params;
  const group = new GroupService();

  res.sendPromise(group.getGroupById(groupId));
});

router.put('/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { userId, newName } = req.body;

  const group = new GroupService();

  res.sendPromise(group.updateGroupById(groupId, userId, newName));
});

router.delete('/groups/:groupId', async (req, res) => {});

router.post('/members', async (req, res) => {
  const groupBody = req.body;
  const group = new GroupService();

  res.sendPromise(group.addMember(groupBody));
});

router.put('/members/:memberId', async (req, res) => {
  const { memberId } = req.params;
  const groupBody = req.body;
  const group = new GroupService();

  res.sendPromise(group.removeMember(groupBody, memberId));
});

router.get('/members', async (req, res) => {
  const group = new GroupService();

  res.sendPromise(group.getAllMembers());
});

export { router as chatGroupRouter };