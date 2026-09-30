import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema:    './src/lib/schema.ts',
  out:       './database/migrations',
  dialect:   'postgresql',
  schemaFilter: ['spark'],
  dbCredentials: {
    url: process.env.SPARK_PRO_DATABASE_URL!,
    ssl: 'require',
  },
} satisfies Config;
