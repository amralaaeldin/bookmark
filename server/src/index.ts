import express, { Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import { authRoutes, bookmarkRoutes } from './routes';
import './utils/passport';

dotenv.config();
const app = express();
const port = 7000;

app.use(express.json());

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
  res.json({
    result: 'hello world!',
  });
});

app.use('/', authRoutes);
app.use('/', bookmarkRoutes);

app.use(function (_, res) {
  return res.status(404).send({
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`app is running on port: ${port}`);
});

export default app;
