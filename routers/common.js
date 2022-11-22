import express from 'express';
import { CommonService } from '../services/common.js';

const router = express.Router();

router.get('/common/message', async (req, res) => {
  const msg = new CommonService();

  res.sendPromise(msg.topFiveUsers());
})

router.get('/common/group', async (req, res) => {
  const msg = new CommonService();

  res.sendPromise(msg.topFiveGroups());
})

// router.get('/common/')

export { router as commonRouter };
