import { Request } from "express";

export enum AuthType {
  SIGNUP = 'signup',
  LOGIN = 'login',
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
  }
}

export interface UserSession {
  session?: {
    userData?: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
    }
    loggedin?: boolean;
  }
}

export type AuthRequest = Request & UserSession & GoogleProfile
