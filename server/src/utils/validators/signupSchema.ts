import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
    name: { type: 'string' },
  },
  required: ['email', 'password', 'name'],
  additionalProperties: false,
};

export const validateSignup = ajv.compile(schema);
