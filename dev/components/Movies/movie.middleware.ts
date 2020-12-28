import Status from "http-status";
import Responses from "./../../handlers/Response";
import { CreateSchema } from "./schema";

const ResponseHandler = new Responses();

export const CreateMiddleware = async (
  req: any,
  res: Express.Response,
  next: any
) => {
  try {
    await CreateSchema.validateAsync(req.body);
  } catch (error) {
    return ResponseHandler.ErrorResponse(
      res,
      Status.BAD_REQUEST,
      "One or more errors encountered with request",
      error
    );
  }
  next();
};
