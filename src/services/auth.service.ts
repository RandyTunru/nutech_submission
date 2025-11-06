import pool from '../configs/database';
import { RegisterBody, LoginBody } from '../schemas/auth.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { BadRequestException, UnauthorizedException } from '../exceptions';

const SALT_ROUNDS = 10;

export const registerUser = async (data: RegisterBody) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const query = `
    INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email;
  `;

  const values = [
    data.first_name,
    data.last_name,
    data.email,
    hashedPassword,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error: any) {
    if (error.code === '23505' && error.constraint === 'users_email_key') {
      throw new BadRequestException('Email telah digunakan');
    }
    throw error;
  }
};

export const loginUser = async (data: LoginBody) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [data.email];

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new UnauthorizedException('Email atau password salah');
  }

  const user = result.rows[0];

  const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Email atau password salah');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in .env');
    throw new Error('Server configuration error.');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: '1d' } 
  );

  return token;
};