import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema:    './src/lib/schema.ts',
  out:       './database/migrations',
  dialect:   'postgresql',
  dbCredentials: {
    url: (process.env.POSTGRES_URL || process.env.DATABASE_URL)!,
    ssl: 'require',
  },
} satisfies Config;
