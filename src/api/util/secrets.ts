import { config } from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('.env')) {
  config({ path: '.env' });
} else {
  console.error("Environment file doesn't exist!");
  process.exit(1);
}

[
  'MONGO_USER',
  'MONGO_PASS',
  'MONGO_HOST',
  'MONGO_DB',
  'MONGO_AUTH',
  'JWT_SECRET',
].forEach((value: string) => {
  if (!process.env[value]) {
    console.error(`The ${value} environment variables doesn't exist.`);
    process.exit(1);
  }
});

export const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH}`;
