import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({path: '.env'});
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

const client = postgres(process.env.DATABASE_URL as string, {
    max: 1,
    idle_timeout: 5,
});

const db = drizzle(client, {
    schema: schema,
});

async function migrateDb() {
    try {
        await migrate(db,{ migrationsFolder : "migrations" });
        console.log('Database migrated successfully');
    } catch (error) {
        console.error('Error migrating database:', error);
    }
}

migrateDb();

export default db;