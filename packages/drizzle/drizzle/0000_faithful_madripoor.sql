CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` integer,
	`type` text,
	`provider` text,
	`providerAccountId` text,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `team` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`logo` text,
	`logoUrl` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`metadata` blob,
	`theme` text DEFAULT 'system',
	`brandColor` text,
	`darkBrandColor` text,
	`parentId` integer,
	`timeZone` text DEFAULT 'Santo Domingo',
	`timeFormat` integer DEFAULT 12
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`password` text NOT NULL,
	`avatar` text,
	`avatarUrl` text,
	`timezone` text DEFAULT 'Santo Domingo',
	`locale` text DEFAULT 'es-ES',
	`theme` text DEFAULT 'system',
	`createdDate` integer DEFAULT CURRENT_TIMESTAMP,
	`trialEndsAt` integer,
	`credentials` text,
	`teams` text,
	`completeOnBoarding` integer DEFAULT false,
	`timeFormat` integer DEFAULT 12,
	`towFactorSecret` text,
	`towFactorEnabled` integer DEFAULT false,
	`backupCodes` text,
	`identityProvider` text NOT NULL,
	`identityProviderId` text NOT NULL,
	`brandColor` text,
	`brandLogo` text,
	`darkBrandColor` text,
	`verified` integer DEFAULT false,
	`role` text DEFAULT 'USER',
	`accounts` text,
	`sessions` text,
	`verifiedNumbers` text,
	`hosts` text,
	`organizationId` text,
	`organization` text,
	`accessCodes` text,
	`locked` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`identifier` text NOT NULL,
	`token` text,
	`expires` integer,
	`expiresInDays` integer,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP,
	`teamId` integer,
	FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `provider_providerAccountId_idx` ON `account` (`provider`,`providerAccountId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `account` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `username_idx` ON `user` (`username`);--> statement-breakpoint
CREATE INDEX `emailVerified_idx` ON `user` (`email`,`verified`);--> statement-breakpoint
CREATE INDEX `identityProvider_idx` ON `user` (`identityProvider`);--> statement-breakpoint
CREATE UNIQUE INDEX `verificationToken_token_unique` ON `verificationToken` (`token`);--> statement-breakpoint
CREATE INDEX `token_idx` ON `verificationToken` (`token`);--> statement-breakpoint
CREATE INDEX `teamId_idx` ON `verificationToken` (`teamId`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_identifier_token` ON `verificationToken` (`identifier`,`token`);