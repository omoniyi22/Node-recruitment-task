"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_container_1 = __importDefault(require("./../components/Movies/movie.container"));
const movie_middleware_1 = require("./../components/Movies/movie.middleware");
const omdbapi_1 = require("./../components/Movies/omdbapi");
const verifyToken_1 = __importDefault(require("./../utils/verifyToken"));
const router = express_1.default.Router();
router.post("/", verifyToken_1.default, movie_middleware_1.CreateMiddleware, omdbapi_1.OMDBAOP_Middleware, movie_container_1.default.create);
router.get("/", verifyToken_1.default, movie_container_1.default.getAllMovies);
exports.default = router;
