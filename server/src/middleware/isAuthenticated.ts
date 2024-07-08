import { Response, RequestHandler } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AuthRequest, UserSession, JwtPayload } from '../utils/types';
import { storeSession } from '../utils/auth-helpers';

dotenv.config();

export const isAuthenticated: RequestHandler = (req, res, next): void | Response => {
  try {
    const accessToken = req.get('Authorization')?.split(' ')[1];
    if (!(req as UserSession).session?.loggedin && !accessToken)
      return res.status(401).json({ message: 'Access denied' });
    if (accessToken && !(req as UserSession).session?.loggedin) {
      storeSession(
        req as AuthRequest,
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
      );
    }
    next();
  } catch (err) {
    return res.status(503).json(err);
  }
};
