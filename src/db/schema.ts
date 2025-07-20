import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const memes = sqliteTable('memes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  originalImage: text('original_image').notNull(),
  caption: text('caption').notNull(),
  prompt: text('prompt').notNull(),
  generatedImage: text('generated_image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  userId: text('user_id'),
}); 