import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  username: varchar('username', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }),
  appliedDate: timestamp('applied_date').defaultNow(),
});
