import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { team } from "./team";

export const verificationToken = sqliteTable('verificationToken', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    identifier: text('identifier').notNull(),
    token: text('token').unique(),
    expires: integer('expires', { mode: 'timestamp' }),
    expiresInDays: integer('expiresInDays', { mode: 'number' }),
    createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    teamId: integer('teamId', { mode: 'number' }).references(() => team.id),
}, 
(verificationToken) => {
    return {
        tokenIdx: index('token_idx').on(verificationToken.token),
        teamIdIdx: index('teamId_idx').on(verificationToken.teamId),
        uniqueIdentifierToken: uniqueIndex('unique_identifier_token').on(verificationToken.identifier, verificationToken.token),
    };
});
