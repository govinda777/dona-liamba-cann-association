import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db');
export const db = drizzle(sql);
