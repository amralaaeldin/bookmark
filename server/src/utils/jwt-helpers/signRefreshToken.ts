import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '1y',
  });
}
