import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import { authRoutes } from './routes';
import './utils/passport';

dotenv.config();
const app = express();
const port = 7000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL as string,
    methods: '*',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL as string,
    }),
  })
);

app.get('/', (_: Request, res: Response) => {
  res.send('hello world!');
});

app.use('/', authRoutes);

app.use(function (_, res) {
  return res.status(404).send('not found');
});

app.listen(port, () => {
  console.log(`app is running on port: ${port}`);
});

export default app;
