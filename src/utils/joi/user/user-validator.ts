import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  cellphone: Joi.string(),
  dni: Joi.string().required(),
  email: Joi.string().email().required(),
  sex: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  cellphone: Joi.string().optional(),
  dni: Joi.string().optional(),
  sex: Joi.string().optional(),
  company: Joi.string().optional(),
});

export const validationSchemas = {
  createUserSchema
};