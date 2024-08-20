import { Request } from 'express';
import { Session, SessionData } from 'express-session';

export enum AuthType {
  SIGNUP = 'signup',
  LOGIN = 'login',
}

export interface UserRequestBody {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  refreshToken?: string;
}
export interface GoogleProfile {
  user?: {
    id: string;
    displayName: string;
    name: {
      familyName: string;
      givenName: string;
    };
    emails: {
      value: string;
      verified: boolean;
    }[];
    photos: {
      value: string;
    }[];
  };
}

export interface UserSessionData extends SessionData {
  userData?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  loggedin?: boolean;
}

export interface UserSession extends Session {
  userData?: UserSessionData['userData'];
  session?: {
    userData?: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role?: string;
    };
    loggedin?: boolean;
  };
}

export interface CheckAuthRequest extends Request {
  session: Session & Partial<UserSessionData>;
  body: UserRequestBody;
}

export type AuthRequest = CheckAuthRequest & GoogleProfile;
