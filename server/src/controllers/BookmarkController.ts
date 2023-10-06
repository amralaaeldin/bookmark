import { Request, Response } from 'express';
import metaget from 'metaget'
import dotenv from 'dotenv';
import { Bookmark } from './../models';
import { UserSession } from '../utils/types';

dotenv.config();

export class BookmarkController {
  public async index(_: Request, res: Response) {
    try {
      const bookmarks = await Bookmark.find();
      return res.status(200).json(bookmarks);
    } catch (err) {
      return res.status(500).json({ message: "Error while retrieving" });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const bookmark = await Bookmark.findById(req.params.id);
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });
      return res.status(200).json(bookmark);
    } catch (err) {
      return res.status(500).json({ message: "Error while retrieving" });
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const metaResponse = await metaget.fetch(req.body.url);

      const bookmark = await Bookmark.create({
        url: req.body.url,
        title: metaResponse.title ?? metaResponse['og:title'] ?? metaResponse['twitter:title'] ?? '',
        description: metaResponse.description ?? metaResponse['og:description'] ?? metaResponse['twitter:description'] ?? '',
        tags: req.body.tags ?? [],
        thumbnail: metaResponse['og:image'] ?? metaResponse['twitter:image'] ?? 'uploads/bookmark-default-image.jpg',
        userId: (req as UserSession).session?.userData?.id as string,
      });

      return res.status(201).json(bookmark);
    } catch (err) {
      return res.status(500).json({ message: "Error while creating" });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const metaResponse = await metaget.fetch(req.body.url);

      const bookmark = await Bookmark.findById(req.params.id);
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });

      bookmark.url = req.body.url;
      bookmark.title = metaResponse.title ?? metaResponse['og:title'] ?? metaResponse['twitter:title'] ?? bookmark.title;
      bookmark.description = metaResponse.description ?? metaResponse['og:description'] ?? metaResponse['twitter:description'] ?? bookmark.description;
      bookmark.tags = req.body.tags ?? bookmark.tags;
      bookmark.thumbnail = metaResponse['og:image'] ?? metaResponse['twitter:image'] ?? 'uploads/bookmark-default-image.jpg';
      bookmark.save();

      return res.status(200).json(bookmark);
    } catch (err) {
      return res.status(500).json({ message: "Error while updating" });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
      if (!bookmark) return res.status(404).json({ message: 'bookmark not found' });

      res.status(204).end();
    } catch (err) {
      return res.status(500).json({ message: "Error while deleting" });
    }
  }
}
