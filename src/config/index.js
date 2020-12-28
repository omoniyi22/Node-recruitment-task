"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    MONGO_URI: process.env.NODE_ENV === "production"
        ? process.env.PROD_MONGO_URI
        : process.env.DEV_MONGO_URI,
    OMDBAP_KEY: process.env.OMDBAP_KEY,
    JWT_SECRET: process.env.JWT_SECRET
};
