import Joi from "joi";

export const updateTaskSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string(),
  completed: Joi.boolean(),
});
