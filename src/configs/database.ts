import { Pool } from 'pg';

const poolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),

  ssl: { rejectUnauthorized: false },

  // --- Pool Configuration ---
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
  console.error('[database] Unexpected error on idle client', err);
  process.exit(-1);
});

console.log('[database] Connection pool created.');

export default pool;