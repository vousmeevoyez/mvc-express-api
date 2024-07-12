import Joi from "joi";

const namePattern = /^[A-Za-z]+$/;
const phonePattern = /^(?:\+62|62|0)8[1-9][0-9]{6,9}$/;

const userSchema = Joi.object({
  firstName: Joi.string().pattern(namePattern).min(3).required(),
  lastName: Joi.string().pattern(namePattern).min(3).optional(),
  phoneNumber: Joi.string().pattern(phonePattern).length(12).required(), // Hanya memungkinkan panjang 12 karakter
  email: Joi.string().email().required(),
});

export default userSchema;
