"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OMDBAOP_Middleware = void 0;
const config_1 = __importDefault(require("./../../config"));
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const Response_1 = __importDefault(require("./../../handlers/Response"));
const getAll_1 = __importDefault(require("./services/getAll"));
const ResponseHandler = new Response_1.default();
exports.OMDBAOP_Middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let month_added = Number(new Date().getMonth()) + 1;
        let previous_movies = yield getAll_1.default.execute(req.user.userId);
        let previous_movies_for_current_month = previous_movies.filter((data) => data.month_added === month_added);
        if (previous_movies_for_current_month.length < 4 || req.user.role !== "basic") {
            let movie = yield axios_1.default(`http://www.omdbapi.com/?apikey=${config_1.default.OMDBAP_KEY}&t=${req.body.title}`);
            movie = movie.data;
            if ("Title" in movie && "Released" in movie && "Genre" in movie && "Director" in movie) {
                req.movie = {
                    userId: req.user.userId,
                    title: movie.Title,
                    release_date: movie.Released,
                    genre: movie.Genre,
                    director: movie.Director,
                    month_added
                };
            }
            else {
                return ResponseHandler.ErrorResponse(res, http_status_1.default.BAD_REQUEST, "Result Not found", "Internal Error");
            }
        }
        else {
            return ResponseHandler.ErrorResponse(res, http_status_1.default.BAD_REQUEST, "You have reach the limit for basic user" +
                "let's switch to Premium", "Internal Error");
        }
    }
    catch (error) {
        return ResponseHandler.ErrorResponse(res, http_status_1.default.BAD_REQUEST, "One or more errors encountered with request", error);
    }
    next();
});
