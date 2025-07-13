'use server';

import { createDb } from '@/db';
import { memes } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Type for the environment with D1 binding
interface Env {
  DB: any; // D1Database type
}

// This function will be called from your server actions
export async function saveMeme(env: Env, prompt: string, originalImage: string, caption: string, generatedImage?: string, userId?: string) {
  const db = createDb(env);
  
  const result = await db.insert(memes).values({
    originalImage,
    caption,
    generatedImage,
    userId,
    prompt
  });
  
  return result;
}

export async function getMemes(env: Env, userId?: string) {
  const db = createDb(env);
  
  if (userId) {
    const result = await db.select().from(memes).where(eq(memes.userId, userId));
    return result;
  } else {
    const result = await db.select().from(memes);
    return result;
  }
}

export async function getMemeById(env: Env, id: number) {
  const db = createDb(env);
  
  const result = await db.select().from(memes).where(eq(memes.id, id));
  return result[0] || null;
}

export async function deleteMeme(env: Env, id: number, userId?: string) {
  const db = createDb(env);
  
  if (userId) {
    // Only delete if user owns the meme
    const result = await db.delete(memes).where(eq(memes.id, id) && eq(memes.userId, userId));
    return result;
  } else {
    const result = await db.delete(memes).where(eq(memes.id, id));
    return result;
  }
} 