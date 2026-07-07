CREATE TABLE `mailing_list` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mailing_list_id` PRIMARY KEY(`id`),
	CONSTRAINT `mailing_list_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `pre_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`fulfillment` enum('pickup','delivery') NOT NULL DEFAULT 'pickup',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pre_orders_id` PRIMARY KEY(`id`)
);
