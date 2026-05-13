import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';
import { execSync } from 'child_process';

dotenv.config({ path: '.env.local' });
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  console.error('Missing required DB env vars: DB_HOST, DB_USER, DB_NAME');
  process.exit(1);
}

async function setup() {
  const conn = await mysql.createConnection({
    host: DB_HOST,
    port: parseInt(DB_PORT || '3306', 10),
    user: DB_USER,
    password: DB_PASSWORD,
  });

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  console.log(`Database "${DB_NAME}" ready.`);
  await conn.end();

  execSync('npx drizzle-kit push', { stdio: 'inherit' });
}

setup().catch((err) => {
  console.error(err);
  process.exit(1);
});
