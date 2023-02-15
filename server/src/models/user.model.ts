import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { bookmarkSchema, IBookmark } from './bookmark.model';
import './../db';

interface IUser {
  name: string;
  email: string;
  password?: string;
  refreshToken?: string;
  bookmarks?: IBookmark[];
  avatar?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      set: (v: string) => bcrypt.hashSync(v + process.env.PEPPER, parseInt(process.env.SALT_ROUNDS as string)),
    },
    refreshToken: { type: String },
    bookmarks: { type: [bookmarkSchema] },
    avatar: { type: String },
    tags: { type: [String] },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export { User };
