import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { existsSync } from 'fs';

// Local development uses .env.local, but production uses system environment variables.
// We only try to load .env.local if it exists to avoid errors in production/CI.
if (existsSync('.env.local')) {
  config({ path: '.env.local' });
} else {
  config(); // Fallback to standard .env
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️ DATABASE_URL não encontrada. Certifique-se de configurar seu .env.local');
}

export default defineConfig({
  schema: './src/lib/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl || '',
  },
});
