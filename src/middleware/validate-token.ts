import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; 

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 103,
      message: 'Token tidak valid atau kadaluwarsa',
      data: null,
    });
  }
  const token = authHeader.split(' ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('[auth.middleware] JWT_SECRET is not defined in .env');
    return res.status(500).json({
      status: 1,
      message: 'Internal Server Error.',
      data: null,
    });
  }


  try {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      
      next(); 
    } else {
      return res.status(401).json({
        status: 103,
        message: 'Token tidak valid atau kadaluwarsa',
        data: null,
      });
    }
    
  } catch (error) {
    return res.status(401).json({
      status: 103,
      message: 'Token tidak valid atau kadaluwarsa',
      data: null,
    });
  }
};