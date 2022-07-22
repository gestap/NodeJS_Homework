import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required().alphanum()
});

export const loginSchemaValidator = validator.body(loginSchema);
