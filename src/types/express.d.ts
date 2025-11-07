import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload {
  id: string; 
  email: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload; 
    }
  }
}