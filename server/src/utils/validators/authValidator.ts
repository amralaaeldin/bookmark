import { body } from 'express-validator';
import { validator } from './../../middleware';

export const loginValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  validator,
];

export const signupValidator = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').isString(),
  validator,
];