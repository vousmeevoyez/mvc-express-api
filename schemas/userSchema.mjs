import Joi from 'joi';

export const userSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).optional(),
  phoneNumber: Joi.string()
    .pattern(/^(?:\+62|62|0)8[1-9][0-9]{6,9}$/)
    .required(),
  email: Joi.string()
    .email()
    .required(),
});

