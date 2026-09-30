import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const url = process.env.SPARK_PRO_DATABASE_URL!;
// Hosted DBs (Supabase) need SSL; a local Postgres usually has none and resets the connection.
const isLocal = /@(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/.test(url);
const client = postgres(url, { prepare: false, ssl: isLocal ? false : 'require' });
export const db = drizzle(client, { schema });
