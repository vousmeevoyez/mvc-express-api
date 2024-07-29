import Joi from "joi";

const userProfileSchema = Joi.object({
  bio: Joi.string().min(1).required(),
});

export default userProfileSchema;
