import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { RegisterBody, LoginBody } from '../schemas/auth.schema';
import { HttpException } from '../exceptions';

export const registerController = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(200).json({
        status: 0,
        message: 'Registrasi berhasil silahkan login',
        data: null,
    });
  } catch (error) {
    if (error instanceof HttpException) {
      res.status(error.httpStatusCode).json({
        status: error.applicationStatusCode,
        message: error.message,
        data: null,
      });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: null,
      });
    }
  }
};

export const loginController = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({
      status: 0,
      message: 'Login Sukses',
      data: { token },
    });
  } catch (error) {
    if (error instanceof HttpException) {
      res.status(error.httpStatusCode).json({
        status: error.applicationStatusCode,
        message: error.message,
      });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  }
};