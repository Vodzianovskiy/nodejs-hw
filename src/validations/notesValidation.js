import { Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().trim().allow('').optional(),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(isValidObjectId, 'ObjectId validation')
      .required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required(),
    content: Joi.string().trim().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(isValidObjectId, 'ObjectId validation')
      .required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).optional(),
    content: Joi.string().trim().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  })
    .min(1)
    .message('Body must have at least one field: title, content or tag'),
};
