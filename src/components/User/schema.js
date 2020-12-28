"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginJoiSchema = exports.RegisterJoiSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.RegisterJoiSchema = joi_1.default.object({
    password: joi_1.default.string().trim().required().min(8),
    username: joi_1.default.string().trim(),
    name: joi_1.default.string().trim(),
});
exports.LoginJoiSchema = joi_1.default.object({
    password: joi_1.default.string().trim().required().min(8),
    username: joi_1.default.string().trim().required(),
});
