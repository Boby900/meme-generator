CREATE TABLE `memes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`original_image` text NOT NULL,
	`caption` text NOT NULL,
	`generated_image` text,
	`created_at` integer,
	`user_id` text
);
