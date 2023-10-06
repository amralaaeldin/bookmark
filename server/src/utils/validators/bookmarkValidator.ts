import { body } from 'express-validator';
import { validator } from './../../middleware';

export const storeBookmarkValidator = [
  body('url').isURL().withMessage('Invalid URL format'),
  body('tags').isArray().optional().withMessage('Tags must be an array'),
  body('tags.*').isString().optional().withMessage('Each element must be a string'),
  validator,
];

export const updateBookmarkValidator = [
  body('url').isURL().optional().withMessage('Invalid URL format'),
  body('tags').isArray().optional().withMessage('Tags must be an array'),
  body('tags.*').isString().optional().withMessage('Each element must be a string'),
  validator,
];