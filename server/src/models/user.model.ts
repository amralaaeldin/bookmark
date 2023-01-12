import { Schema, model } from 'mongoose';
import { bookmarkSchema, IBookmark } from './bookmark.model';

interface IUser {
  name: string;
  email: string;
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
    bookmarks: { type: [bookmarkSchema] },
    avatar: { type: String },
    tags: { type: [String] },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;
