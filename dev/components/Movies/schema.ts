import Joi from "@hapi/joi";

export const CreateSchema = Joi.object({
  title: Joi.string().required()
});


