import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.app' });

import pool from './configs/database'; 

import { errorHandler } from './middleware/error-handler';
import authRouter from './routers/auth.router';

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbStatus = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return 'connected';
  } catch (error) {
    return 'disconnected';
  }
};

app.get('/health', async (req: Request, res: Response) => {
  const db = await dbStatus();
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    db: db
  });
});

// Routers
app.use(authRouter);

// Error Handling Middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    
    console.log('[server] Pinging database...');
    const client = await pool.connect();
    await client.query('SELECT NOW()'); 
    client.release(); 
    
    console.log('[server] Database connection successful');

    
    app.listen(port, () => {
      console.log('[server] Server is running');
    });
  } catch (error) {
    console.error('[server] Failed to connect to the database');
    console.error(error);
    process.exit(1); 
  }
};


startServer();

export default app;