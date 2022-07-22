import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

import { Permission } from '../../../types';

const validator = createValidator();

const groupRequestSchema = Joi.object({
  name: Joi.string().required(),
  permission: Joi.array().items(
    Joi
      .string()
      .valid(Permission.WRITE, Permission.DELETE, Permission.READ, Permission.SHARE, Permission.UPLOAD_FILES)
      .required()
  ).required()
});

const updateGroupRequestSchema = Joi.object({
  name: Joi.string(),
  permission: Joi.array().items(
    Joi
      .string()
      .valid(Permission.WRITE, Permission.DELETE, Permission.READ, Permission.SHARE, Permission.UPLOAD_FILES)
      .required()
  )
});

export const groupRequestValidator = validator.body(groupRequestSchema);
export const updateGroupRequestValidator = validator.body(updateGroupRequestSchema);
