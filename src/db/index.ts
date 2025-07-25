// src/lib/db.ts
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

// Type for the environment with D1 binding
export interface Env {
  DB: any; // D1Database type
}

let db: any;

if (process.env.NODE_ENV === 'development') {
  // For local development, use file-based SQLite
  const client = createClient({
    url: 'file:local.db'  // This creates a local SQLite file
  });
  
  db = drizzle(client, { schema });
} else {
  // Production will use D1 binding
  db = null; // Will be initialized with D1 binding in production
}

export { db };

// Function to create DB with D1 binding for production
export function createDb(d1Binding: any) {
  return drizzle(d1Binding, { schema });
}

// Alternative function for libsql client in production
export function createDbWithUrl(url: string, authToken?: string) {
  const client = createClient({
    url,
    authToken
  });
  
  return drizzle(client, { schema });
}