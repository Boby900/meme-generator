import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
    databaseId: '04a7d2a0-185d-47fb-a346-9d3b893bcb5c',
    token: process.env.CLOUDFLARE_API_TOKEN || '',
  },
});