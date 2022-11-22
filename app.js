import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { Response, RESPONSE_STATUS, RESPONSE_MESSAGE } from './appConstant.js';
dotenv.config({ path: '.env' });

const app = new express();

import { userRouter } from './routers/users.js';
import { chatGroupRouter } from './routers/chat-group.js';
import { messageRouter } from './routers/message.js';
import { commonRouter } from './routers/common.js';

app.use(express.json({limit: '10kb'})); //uploading data should be less than or equal to 10kb
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb'}));
app.use(cors());

const promisify = (req, res, next) => {
  res.sendPromise = (promise) => {
    promise
      .then((result) => {
        res.send(new Response(RESPONSE_STATUS.OK, RESPONSE_MESSAGE.OK, result));
      })
      .catch((err) => {
        console.log(err);
        res.status(RESPONSE_STATUS.ERROR);
        res.send(new Response(RESPONSE_STATUS.ERROR, err.message, err));
      });
  };
  next();
};
app.use(promisify);

app.use(helmet());

app.use(userRouter);
app.use(chatGroupRouter);
app.use(messageRouter);
app.use(commonRouter);

app.use('*', async (req, res) => {
  res.send('Hello There');
})

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

export { app };