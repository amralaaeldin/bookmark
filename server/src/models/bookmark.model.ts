import { Schema, model } from 'mongoose';
import './../db';

interface IBookmark {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  thumbnail?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    title: { type: String, required: true, trim: true, unique: true },
    url: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    tags: {
      type: [String],
      set: (v: string[]) => v.map((tag) => tag.toLowerCase().trim()).filter((tag) => tag.length > 0),
    },
    thumbnail: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Bookmark = model<IBookmark>('Bookmark', bookmarkSchema);
export { Bookmark, bookmarkSchema, IBookmark };
