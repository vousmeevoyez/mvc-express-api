import Joi from 'joi';

export const itemSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
});

