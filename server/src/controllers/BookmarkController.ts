import { Request, Response } from 'express';
import mongoose from 'mongoose';
import metaget from 'metaget';
import dotenv from 'dotenv';
import { Bookmark, User } from './../models';
import { UserSession } from '../utils/types';

dotenv.config();

export class BookmarkController {
  public async index(req: Request, res: Response) {
    try {
      const bookmarks = await Bookmark.find({ userId: (req as UserSession).session?.userData?.id as string });
      return res.status(200).json(bookmarks);
    } catch (err) {
      return res.status(500).json({ message: 'Error while retrieving' });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const bookmark = await Bookmark.findOne({
        id: req.params.id,
        userId: (req as UserSession).session?.userData?.id as string,
      });
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });
      return res.status(200).json(bookmark);
    } catch (err) {
      return res.status(500).json({ message: 'Error while retrieving' });
    }
  }

  public async store(req: Request, res: Response) {
    let session = null;

    try {
      const metaResponse = await metaget.fetch(req.body.url);

      const tags: Set<string> = new Set(req.body.tags ?? []);

      session = await mongoose.startSession();
      session.startTransaction();

      const bookmark = await Bookmark.create(
        {
          url: req.body.url,
          title: metaResponse.title ?? metaResponse['og:title'] ?? metaResponse['twitter:title'] ?? '',
          description:
            metaResponse.description ?? metaResponse['og:description'] ?? metaResponse['twitter:description'] ?? '',
          tags: [...tags],
          thumbnail: metaResponse['og:image'] ?? metaResponse['twitter:image'] ?? 'uploads/bookmark-default-image.jpg',
          userId: (req as UserSession).session?.userData?.id as string,
        },
        { session }
      );

      await User.updateOne(
        { _id: (req as UserSession).session?.userData?.id },
        { $addToSet: { tags: { $each: [...tags] } } },
        { session }
      );

      await session.commitTransaction();

      return res.status(201).json(bookmark);
    } catch (err) {
      await session?.abortTransaction();
      return res.status(500).json({ err });
    } finally {
      session?.endSession();
    }
  }

  public async update(req: Request, res: Response) {
    let session = null;

    try {
      const metaResponse = await metaget.fetch(req.body.url);

      const bookmark = await Bookmark.findOne({
        id: req.params.id,
        userId: (req as UserSession).session?.userData?.id as string,
      });
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });

      session = await mongoose.startSession();
      session.startTransaction();

      const tags: Set<string> = new Set(req.body.tags ?? bookmark.tags);
      bookmark.url = req.body.url;
      bookmark.title =
        metaResponse.title ?? metaResponse['og:title'] ?? metaResponse['twitter:title'] ?? bookmark.title;
      bookmark.description =
        metaResponse.description ??
        metaResponse['og:description'] ??
        metaResponse['twitter:description'] ??
        bookmark.description;
      bookmark.tags = [...tags];
      bookmark.thumbnail =
        metaResponse['og:image'] ?? metaResponse['twitter:image'] ?? 'uploads/bookmark-default-image.jpg';
      bookmark.save({ session });

      await User.updateOne(
        { _id: (req as UserSession).session?.userData?.id },
        { $addToSet: { tags: { $each: [...tags] } } }
      );

      await session.commitTransaction();

      return res.status(200).json(bookmark);
    } catch (err) {
      await session?.abortTransaction();
      return res.status(500).json({ err });
    } finally {
      session?.endSession();
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const bookmark = await Bookmark.findOneAndDelete({
        id: req.params.id,
        userId: (req as UserSession).session?.userData?.id as string,
      });
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({ message: 'Error while deleting' });
    }
  }
}
