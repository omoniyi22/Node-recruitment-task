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
exports.LoginMiddleware = void 0;
const Status_1 = __importDefault(require("./../../handlers/Status"));
const Response_1 = __importDefault(require("./../../handlers/Response"));
const schema_1 = require("./schema");
const ResponseHandler = new Response_1.default();
exports.LoginMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    try {
        yield schema_1.LoginJoiSchema.validateAsync(requestBody);
    }
    catch (error) {
        return ResponseHandler.ErrorResponse(res, Status_1.default.BAD_REQUEST.code, Status_1.default.BAD_REQUEST.message, error);
    }
    next();
});