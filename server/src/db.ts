import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const client = mongoose.connect(process.env.DB_URL as string);
