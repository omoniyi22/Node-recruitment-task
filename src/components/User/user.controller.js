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
const Response_1 = __importDefault(require("./../../handlers/Response"));
const Status_1 = __importDefault(require("./../../handlers/Status"));
const auth_service_1 = __importDefault(require("./auth.service"));
const config_1 = __importDefault(require("./../../config"));
const responses = new Response_1.default();
class UserController {
    constructor() {
        this.login = this.login.bind(this);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const password = req.body.password;
            let { authFactory } = auth_service_1.default;
            try {
                let token = yield authFactory(config_1.default.JWT_SECRET)(username, password);
                responses.SuccessResponse(res, Status_1.default.OK.code, Status_1.default.OK.message, { token });
            }
            catch (error) {
                responses.ErrorResponse(res, Status_1.default.FORBIDDEN, Status_1.default.SERVER_ERROR.message, error);
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
