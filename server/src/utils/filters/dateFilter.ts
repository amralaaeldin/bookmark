import { Document, FilterQuery } from 'mongoose';
import { Filter } from './filterInterface';
import { RequestWithSession } from '../types';

export class DateFilter implements Filter {
  apply(query: FilterQuery<Document>[], req: RequestWithSession): void {
    if (req.query.date || req.query.startDate || req.query.endDate) {
      let startOfDay, endOfDay;

      if (req.query.date) {
        [startOfDay, endOfDay] = this.getDateBoundaries(req.query.date as string);

        query.push({
          $or: [
            { createdAt: { $gte: startOfDay, $lte: endOfDay } },
            { updatedAt: { $gte: startOfDay, $lte: endOfDay } },
          ],
        });
      } else if (req.query.startDate && req.query.endDate) {
        [startOfDay, endOfDay] = this.getDateBoundaries(req.query.startDate as string, req.query.endDate as string);

        query.push({
          $or: [
            { createdAt: { $gte: startOfDay, $lte: endOfDay } },
            { updatedAt: { $gte: startOfDay, $lte: endOfDay } },
          ],
        });
      } else if (req.query.startDate) {
        startOfDay = this.getDateBoundaries(req.query.startDate as string)[0];

        query.push({
          $or: [{ createdAt: { $gte: startOfDay } }, { updatedAt: { $gte: startOfDay } }],
        });
      } else if (req.query.endDate) {
        endOfDay = this.getDateBoundaries(req.query.endDate as string)[1];

        query.push({
          $or: [{ createdAt: { $lte: endOfDay } }, { updatedAt: { $lte: endOfDay } }],
        });
      }
    }
  }

  getDateBoundaries(date1: string, date2: string | null = null) {
    let startOfDay, endOfDay;
    if (date2) {
      const startDate = new Date(date1);
      const endDate = new Date(date2);
      startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
      endOfDay = new Date(endDate.setHours(23, 59, 59, 999));
    } else {
      const date = new Date(date1);
      startOfDay = new Date(date.setHours(0, 0, 0, 0));
      endOfDay = new Date(date.setHours(23, 59, 59, 999));
    }

    return [startOfDay, endOfDay];
  }
}
