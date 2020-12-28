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
const http_status_1 = __importDefault(require("http-status"));
const Response_1 = __importDefault(require("./../../handlers/Response"));
const create_1 = __importDefault(require("./services/create"));
const getAll_1 = __importDefault(require("./services/getAll"));
const loggerConfig = {
    service: "comments-service",
    file: "controller.ts",
};
const responses = new Response_1.default();
class MovieController {
    constructor() { }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield create_1.default.execute(req.movie);
                responses.SuccessResponse(res, http_status_1.default.OK, "Movies created successfully", result);
            }
            catch (error) {
                responses.ErrorResponse(res, http_status_1.default.BAD_REQUEST, "Error", error);
            }
        });
    }
    getAllMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield getAll_1.default.execute(req.user.userId);
                responses.SuccessResponse(res, http_status_1.default.OK, "Movies Fetched successfully", result);
            }
            catch (error) {
                responses.ErrorResponse(res, http_status_1.default.BAD_REQUEST, "Error", error);
            }
        });
    }
}
const movieController = new MovieController();
exports.default = movieController;
