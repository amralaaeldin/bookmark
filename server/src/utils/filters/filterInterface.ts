import { RequestWithSession } from '../types';
import { Document, FilterQuery } from 'mongoose';

export interface Filter {
  apply(query: FilterQuery<Document>[], req: RequestWithSession): void;
}
