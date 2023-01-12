import { Schema } from 'mongoose';

interface IBookmark {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  icon?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    tags: { type: [String] },
    icon: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

export { bookmarkSchema, IBookmark };
