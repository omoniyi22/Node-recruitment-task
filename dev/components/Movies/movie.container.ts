import { NextFunction, Response } from "express";
import Status from "http-status";
import Responses from "./../../handlers/Response";
import CreateMovie from "./services/create";
import getAllMovies from "./services/getAll";

const loggerConfig = {
  service: "comments-service",
  file: "controller.ts",
};

const responses = new Responses();
class MovieController {
  constructor() { }
  async create(req: any, res: Response, next: NextFunction) {
    try {
 
      const result = await CreateMovie.execute(req.movie);
      responses.SuccessResponse(
        res,
        Status.OK,
        "Movies created successfully",
        result
      );
    } catch (error) {
      responses.ErrorResponse(res, Status.BAD_REQUEST, "Error", error);
    }
  }

  async getAllMovies(req: any, res: Response, next: NextFunction) {
    try {
      const result = await getAllMovies.execute(req.user.userId);
      responses.SuccessResponse(
        res,
        Status.OK,
        "Movies Fetched successfully",
        result
      );
    } catch (error) {
      responses.ErrorResponse(res, Status.BAD_REQUEST, "Error", error);
    }
  }
}

const movieController = new MovieController();
export default movieController;
