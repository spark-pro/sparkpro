import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema:    './src/lib/schema.ts',
  out:       './database/migrations',
  dialect:   'mysql',
  dbCredentials: {
    host:     process.env.DB_HOST!,
    port:     parseInt(process.env.DB_PORT || '3306', 10),
    user:     process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
} satisfies Config;
