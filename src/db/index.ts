import { drizzle } from 'drizzle-orm/d1';
import { memes } from './schema';

// Database connection function for server-side usage
export function createDb(d1: any) {
  return drizzle(d1, { schema: { memes } });
}

// Export schema for migrations
export { memes }; 