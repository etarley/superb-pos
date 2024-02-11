import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  username: text('username').unique().notNull(),
  name: text('name').notNull(),
  // @zod.email()
    email: text('email').unique(),
    password: text('password').notNull(),
    avatar: text('avatar'),
    avatarUrl: text('avatarUrl'),
    timezone: text('timezone').default('Santo Domingo'),
    locale: text('locale', {enum:["es-ES", "en-US"]}).default('es-ES'),
    theme: text('theme' , {enum:["light", "dark", "system"]}).default('system'),
    createdDate: integer('createdDate', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    trialEndsAt: integer('trialEndsAt', { mode: 'timestamp' }),
    credentials: text('credentials'),
    teams: text('teams'),
    completeOnBoarding: integer('completeOnBoarding', { mode: 'boolean' }).default(false),
    timeFormat: integer('timeFormat', { mode: 'number' }).default(12),
    towFactorSecret: text('towFactorSecret'),
    towFactorEnabled: integer('towFactorEnabled', { mode: 'boolean' }).default(false),
    backupCodes: text('backupCodes'),
    identityProvider: text('identityProvider', {enum:["email", "google", "facebook", "apple","SAML"]}).notNull(),
    identityProviderId: text('identityProviderId').notNull(),
    brandColor: text('brandColor'),
    brandLogo: text('brandLogo'),
    darkBrandColor: text('darkBrandColor'),
    verified: integer('verified', { mode: 'boolean' }).default(false),
    role: text('role', {enum:["USER", "ADMIN", "DEVELOPER"]}).default('USER'),
    accounts: text('accounts'),
    sessions: text('sessions'),
    verifiedNumbers: text('verifiedNumbers'),
    hosts: text('hosts'),
    organizationId: text('organizationId'),
    organization: text('organization'),
    accessCodes: text('accessCodes'),
    locked: integer('locked', { mode: 'boolean' }).default(false),
}, 
(user) => {
    return {
        usernameIdx: uniqueIndex('username_idx')
        .on(user.username),
        emailVerifiedIdx: index('emailVerified_idx')
        .on(user.email, user.verified),
        identityProviderIdx: index('identityProvider_idx')
        .on(user.identityProvider),
    };
});

