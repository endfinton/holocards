CREATE TABLE `collection_cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scryfall_id` varchar(64) NOT NULL,
	`user_id` varchar(191),
	`name` varchar(255) NOT NULL,
	`rarity` varchar(32) NOT NULL,
	`image_url` varchar(1024),
	`is_foil` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `collection_cards_id` PRIMARY KEY(`id`)
);
