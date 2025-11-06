import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validateSchema = (schema: ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            status: 102,
            message: error.issues.map((issue) => issue.message).join(', '),
            data: null,
          });
        }
      }
  };
};
