import Joi from "@hapi/joi";
import { allow } from "joi";

export const RegisterJoiSchema = Joi.object({
  password: Joi.string().trim().required().min(8),
  username: Joi.string().trim(),
  name: Joi.string().trim(),
});

export const LoginJoiSchema = Joi.object({
  password: Joi.string().trim().required().min(8),
  username: Joi.string().trim().required(),
});

