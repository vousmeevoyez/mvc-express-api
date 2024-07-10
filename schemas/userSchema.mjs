import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().pattern(/^[A-Z a-z]+$/).min(3).required(),
  lastName: Joi.string().pattern(/^[A-Z a-z]+$/).min(3).optional(),
  phoneNumber: Joi.string()
    .pattern(/^(?:\+62|62|0)8[1-9][0-9]{9,12}$/)
    .required(),
  email: Joi.string().email().required(),
});

export default userSchema;
