import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '1h',
  });
}
