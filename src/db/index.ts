import { drizzle } from 'drizzle-orm/d1';
import { memes } from './schema';

// Type for the environment with D1 binding
export interface Env {
  DB: any; // D1Database type
}

// Database connection function for server-side usage
export function createDb(env: Env) {
  return drizzle(env.DB, { schema: { memes } });
}

// Alternative: Direct connection if you have access to the D1Database directly
export function createDbFromD1(d1: any) {
  return drizzle(d1, { schema: { memes } });
}

// Export schema for migrations
export { memes }; 