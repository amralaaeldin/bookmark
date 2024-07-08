import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../types';

dotenv.config();

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '1y',
  });
}
