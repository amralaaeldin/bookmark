import { Response, RequestHandler } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CheckAuthRequest, JwtPayload } from '../utils/types';
import { storeSession } from '../utils/auth-helpers';

dotenv.config();

export const isAuthenticated: RequestHandler = (req: CheckAuthRequest, res, next): void | Response => {
  try {
    const accessToken = req.get('Authorization')?.split(' ')[1];
    if (!req.session?.loggedin && !accessToken) return res.status(401).json({ message: 'Access denied' });
    if (accessToken && !req.session?.loggedin) {
      storeSession(req, jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload);
    }
    next();
  } catch (err) {
    return res.status(503).json(err);
  }
};
