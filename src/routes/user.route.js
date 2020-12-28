"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./../components/User"));
const user_middleware_1 = require("./../components/User/user.middleware");
const router = express_1.default.Router();
router.post("/login", user_middleware_1.LoginMiddleware, User_1.default.login);
exports.default = router;
