import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_URL) {
  throw new Error('Missing environment variable: DB_URL');
}

export const client = mongoose.connect(process.env.DB_URL);
