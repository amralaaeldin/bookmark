import { RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const isAuthorized: RequestHandler = (req, res, next): void | Response => {
  try {
    const accessToken = req.get('Authentication')?.split(' ')[1];
    if (!req.session?.loggedin && !accessToken) return res.status(401).json({ message: 'Access denied' });
    if (accessToken) jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
    next();
  } catch (err) {
    return res.status(503).json(err);
  }
};
