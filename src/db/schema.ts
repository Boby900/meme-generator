import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const memes = sqliteTable('memes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  originalImage: text('original_image').notNull(),
  caption: text('caption').notNull(),
  generatedImage: text('generated_image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  userId: text('user_id'),
}); 