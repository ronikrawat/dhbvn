import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;
let _db: DrizzleDb | null = null;

/** Dynamically retrieves the database handle at request runtime. Returns null if neither POSTGRES_URL nor DATABASE_URL is set. */
export function getDb(): DrizzleDb | null {
  const conn = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!conn) {
    return null;
  }
  if (!_db) {
    if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
      process.env.POSTGRES_URL = process.env.DATABASE_URL;
    }
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export const db = getDb();

