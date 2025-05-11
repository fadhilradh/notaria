import type {Config} from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

export default {
  schema: './src/app/lib/supabase/schema.ts',  
  out: './migrations',
  dialect: 'postgresql', 
  driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || '',
    },
} 