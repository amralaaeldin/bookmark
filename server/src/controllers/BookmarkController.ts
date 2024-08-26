import { Response } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import metaget from 'metaget';
import dotenv from 'dotenv';
import { Bookmark, IBookmark, User } from './../models';
import { RequestWithSession } from '../utils/types';
import { DateFilter, KeywordFilter, Filter } from '../utils/filters';

dotenv.config();

export class BookmarkController {
  public async index(req: RequestWithSession, res: Response) {
    try {
      const filters: Filter[] = [new KeywordFilter(), new DateFilter()];
      const query: FilterQuery<IBookmark>[] = [];

      filters.forEach((filter) => filter.apply(query, req));

      const bookmarks = await Bookmark.find({
        userId: req.session?.userData?.id,
        $and: query,
      });

      return res.status(200).json(bookmarks);
    } catch (err) {
      return res.status(500).json({ message: 'Error while retrieving' });
    }
  }

  public async show(req: RequestWithSession, res: Response) {
    try {
      const bookmark = await Bookmark.findOne({
        id: req.params.id,
        userId: req.session?.userData?.id as string,
      });
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });
      return res.status(200).json(bookmark);
    } catch (err) {
      return res.status(500).json({ message: 'Error while retrieving' });
    }
  }

  public async store(req: RequestWithSession, res: Response) {
    try {
      const metaResponse = await metaget.fetch(req.body.url);

      const tags: Set<string> = new Set(req.body.tags ?? []);

      const bookmark = await Bookmark.create({
        url: req.body.url,
        title: req.body.title ?? metaResponse.title ?? metaResponse['og:title'] ?? metaResponse['twitter:title'] ?? '',
        description:
          req.body.description ??
          metaResponse.description ??
          metaResponse['og:description'] ??
          metaResponse['twitter:description'] ??
          '',
        tags: [...tags],
        thumbnail: metaResponse['og:image'] ?? metaResponse['twitter:image'] ?? 'uploads/bookmark-default-image.jpg',
        userId: req.session?.userData?.id as string,
      });

      await User.updateOne({ _id: req.session?.userData?.id }, { $addToSet: { tags: { $each: [...tags] } } });

      return res.status(201).json(bookmark);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ err });
      } else {
        return res.status(500).json({ err });
      }
    }
  }

  public async update(req: RequestWithSession, res: Response) {
    try {
      const bookmark = await Bookmark.findOne({
        id: req.params.id,
        userId: req.session?.userData?.id as string,
      });
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });

      const tags: Set<string> = new Set(req.body.tags ?? bookmark.tags);

      let metaResponse, title, description, thumbnail;
      if (req.body.url) {
        metaResponse = await metaget.fetch(req.body.url);
        title = metaResponse.title ?? metaResponse['og:title'] ?? metaResponse['twitter:title'];
        description = metaResponse.description ?? metaResponse['og:description'] ?? metaResponse['twitter:description'];
        thumbnail = metaResponse['og:image'] ?? metaResponse['twitter:image'];
      }

      bookmark.url = req.body.url ?? bookmark.url;
      bookmark.title = req.body.title ?? title ?? bookmark.title;
      bookmark.description = req.body.description ?? description ?? bookmark.description;
      bookmark.tags = [...tags];
      bookmark.thumbnail = thumbnail ?? bookmark.thumbnail;
      bookmark.save();

      await User.updateOne({ _id: req.session?.userData?.id }, { $addToSet: { tags: { $each: [...tags] } } });

      return res.status(200).json(bookmark);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ err });
      } else {
        return res.status(500).json({ err });
      }
    }
  }

  public async delete(req: RequestWithSession, res: Response) {
    try {
      const bookmark = await Bookmark.findOneAndDelete({
        id: req.params.id,
        userId: req.session?.userData?.id as string,
      });
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({ message: 'Error while deleting' });
    }
  }
}
