import { Document, FilterQuery } from 'mongoose';
import { Filter } from './filterInterface';
import { RequestWithSession } from '../types';

export class KeywordFilter implements Filter {
  apply(query: FilterQuery<Document>[], req: RequestWithSession): void {
    if (req.query.keyword) {
      query.push({
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } },
          { tags: { $regex: req.query.keyword, $options: 'i' } },
        ],
      });
    }
  }
}
