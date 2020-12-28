import Status from "./../../handlers/Status";
import Responses from "./../../handlers/Response";
import { LoginJoiSchema } from "./schema";
const ResponseHandler = new Responses();



export const LoginMiddleware = async (
  req: any,
  res: Express.Response,
  next: any
) => {
  const requestBody = req.body;
  try {
    await LoginJoiSchema.validateAsync(requestBody);
  } catch (error) {
    return ResponseHandler.ErrorResponse(
      res,
      Status.BAD_REQUEST.code,
      Status.BAD_REQUEST.message,
      error
    );
  }
  next();
};