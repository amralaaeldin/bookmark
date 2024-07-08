import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../types';

dotenv.config();

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  });
}
