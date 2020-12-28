import config from "./../../config";
import axios from 'axios'
import Status from "http-status";
import Responses from "./../../handlers/Response";

import getAllMovies from "./services/getAll";
import { Movie } from "./type";

const ResponseHandler = new Responses();
export const OMDBAOP_Middleware = async (
  req: any,
  res: Express.Response,
  next: any
) => {
  try {
    let month_added = Number(new Date().getMonth()) + 1
    let previous_movies = await getAllMovies.execute(req.user.userId);
    let previous_movies_for_current_month = previous_movies.filter((data: Movie) => data.month_added === month_added)

    if (previous_movies_for_current_month.length < 4 || req.user.role !== "basic") {
      let movie: any = await axios(`http://www.omdbapi.com/?apikey=${config.OMDBAP_KEY}&t=${req.body.title}`)
      movie = movie.data

      if ("Title" in movie && "Released" in movie && "Genre" in movie && "Director" in movie) {
        req.movie = {
          userId: req.user.userId,
          title: movie.Title,
          release_date: movie.Released,
          genre: movie.Genre,
          director: movie.Director,
          month_added
        }
      } else {
        return ResponseHandler.ErrorResponse(
          res,
          Status.BAD_REQUEST,
          "Result Not found",
          "Internal Error"
        );
      }
    } else {
      return ResponseHandler.ErrorResponse(
        res,
        Status.BAD_REQUEST,
        "You have reach the limit for basic user" +
        "let's switch to Premium",
        "Internal Error"
      );
    }
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
