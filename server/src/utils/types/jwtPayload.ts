export type JwtPayload = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role?: string;
  };
};
