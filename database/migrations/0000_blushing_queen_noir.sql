CREATE TABLE `cat` (
	`cat_id` integer PRIMARY KEY NOT NULL,
	`name` text(50) NOT NULL,
	`date_of_birth` text
);
--> statement-breakpoint
CREATE TABLE `catNickname` (
	`cat_nickname_id` integer PRIMARY KEY NOT NULL,
	`cat_id` integer NOT NULL,
	`nickname` text(50) NOT NULL,
	FOREIGN KEY (`cat_id`) REFERENCES `cat`(`cat_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `catNickname_cat_id_nickname_unique` ON `catNickname` (`cat_id`,`nickname`);