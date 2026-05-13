import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const pool = mysql.createPool({
  host:            process.env.DB_HOST!,
  port:            parseInt(process.env.DB_PORT || '3306', 10),
  user:            process.env.DB_USER!,
  password:        process.env.DB_PASSWORD!,
  database:        process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit:    10,
  charset:            'utf8mb4',
  ...(process.env.DB_SSL === 'true' && { ssl: { rejectUnauthorized: false } }),
});

export const db = drizzle(pool, { schema, mode: 'default' });
export { pool };
