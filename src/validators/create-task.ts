import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
});
