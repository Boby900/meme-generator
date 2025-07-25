// src/lib/db.ts
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';
import path from 'path';

// For local development with libsql
const dbPath = path.join(process.cwd(), '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/b13b2fab9f45b50dcb12778c35c00e39b3d38e39796f31bb3ca1b29d53e1c55e.sqlite');

const client = createClient({
  url: `file:${dbPath}`
});

export const db = drizzle(client, { schema });