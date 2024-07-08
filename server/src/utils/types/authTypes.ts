import { Request } from 'express';

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

export interface UserSession {
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

export type AuthRequest = Request<object, object, UserRequestBody> & UserSession & GoogleProfile;
export type CheckAuthRequest = Request<object, object, UserRequestBody> & UserSession;
