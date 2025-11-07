import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[errorHandler]', err);
  res.status(500).json({
    status: 1,
    message: 'Internal Server Error',
    data: null,
  });
};