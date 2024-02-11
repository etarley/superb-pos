import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { user } from "./user";

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  userId: integer('userId', { mode: 'number' }).references(() => user.id),
  type: text('type'),
  provider: text('provider'),
  providerAccountId: text('providerAccountId'),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at', { mode: 'number' }),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
}, 
(account) => {
    return {
        providerAccountIdIdx: uniqueIndex('provider_providerAccountId_idx')
            .on(account.provider, account.providerAccountId),
        userIdIdx: index('userId_idx')
            .on(account.userId),
        typeIdx: index('type_idx')
            .on(account.type),
    };
});
