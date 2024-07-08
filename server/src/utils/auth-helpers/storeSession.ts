import dotenv from 'dotenv';
import { AuthRequest, JwtPayload } from '../../utils/types';

dotenv.config();

export function storeSession(req: AuthRequest, payload: JwtPayload) {
  req.session.userData = {
    id: String(payload.user.id),
    name: payload.user.name,
    email: payload.user.email,
    avatar: payload.user.avatar,
    role: payload.user.role,
  };
  req.session.loggedin = true;

  return req.session.userData;
}
