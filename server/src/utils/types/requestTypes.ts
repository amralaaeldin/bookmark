import { Request } from 'express';
import { Session } from 'express-session';
import { UserSessionData } from './authTypes';

export interface RequestWithSession extends Request {
  session: Session & Partial<UserSessionData>;
}
