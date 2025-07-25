import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/b13b2fab9f45b50dcb12778c35c00e39b3d38e39796f31bb3ca1b29d53e1c55e.sqlite'
  }
});