import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

/** Lazily-initialized database handle. Returns null if neither POSTGRES_URL nor DATABASE_URL is set. */
function createDb() {
  const conn = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!conn) {
    return null;
  }
  if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
    process.env.POSTGRES_URL = process.env.DATABASE_URL;
  }
  return drizzle(sql, { schema });
}

export const db = createDb();

