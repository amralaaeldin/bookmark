import { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  bookmarks?: Types.ObjectId[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bookmarks: { type: [Schema.Types.ObjectId], ref: 'Bookmark' },
    avatar: { type: String },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;