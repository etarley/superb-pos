import { sql } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const team = sqliteTable('team', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    logo: text('logo'),
    logoUrl: text('logoUrl'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    metadata: blob('metadata', { mode: 'json' }),
    theme: text('theme').default("system"),
    brandColor: text('brandColor'),
    darkBrandColor: text('darkBrandColor'),
    parentId: integer('parentId', { mode: 'number' }),
    timeZone: text('timeZone').default("Santo Domingo"),
    timeFormat: integer('timeFormat', { mode: 'number' }).default(12),
}, 
);
