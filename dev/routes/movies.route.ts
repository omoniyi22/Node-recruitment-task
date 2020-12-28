import express from "express";
import MovieController from "./../components/Movies/movie.container";
import { CreateMiddleware } from "./../components/Movies/movie.middleware";
import { OMDBAOP_Middleware } from "./../components/Movies/omdbapi";
import verifyUserToken from "./../utils/verifyToken";
const router = express.Router();
router.post("/", verifyUserToken, CreateMiddleware, OMDBAOP_Middleware, MovieController.create);

router.get("/", verifyUserToken, MovieController.getAllMovies);

export default router;
