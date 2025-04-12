import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL;
if(connectionString === undefined) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
}
// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

// Export schema for use in queries
export * from './schema';
