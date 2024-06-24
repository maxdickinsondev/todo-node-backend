import Joi from "joi";

export const deleteTaskSchema = Joi.object({
  id: Joi.number().required(),
});
