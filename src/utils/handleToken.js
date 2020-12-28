"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class HandleToken {
    constructor() { }
    generateToken(userId, name, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const holder = {
                userId,
                name,
                role
            };
            return new Promise((resolve, reject) => {
                jwt.sign(holder, process.env.JWT_SECRET, {
                    expiresIn: 86400,
                    issuer: "https://www.netguru.com/",
                    subject: "123"
                }, (error, token) => {
                    if (error)
                        return reject(error);
                    const _response = {
                        auth: true,
                        token
                    };
                    resolve(_response);
                });
            });
        });
    }
    decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    token = token.toString();
                }
                catch (error) {
                    return reject({
                        auth: false,
                        message: "Invalid token"
                    });
                }
                jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                    if (error) {
                        return reject({
                            auth: false,
                            error,
                            message: "Failed to authenticate token"
                        });
                    }
                    //console.log({ decoded })
                    return resolve(decoded);
                });
            });
        });
    }
}
exports.default = HandleToken;
