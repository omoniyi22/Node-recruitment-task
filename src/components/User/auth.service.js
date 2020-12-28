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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const users = [
    {
        id: 123,
        role: "basic",
        name: "Basic Thomas",
        username: "basic-thomas",
        password: "sR-_pcoow-27-6PAwCD8",
    },
    {
        id: 434,
        role: "premium",
        name: "Premium Jim",
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
    },
];
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = message;
    }
}
const authFactory = (secret) => (username, password) => {
    const user = users.find((u) => u.username === username);
    return new Promise((resolve, reject) => {
        if (!user || user.password !== password) {
            throw new AuthError("Failed Authentication");
        }
        else {
            return jwt.sign({
                userId: user.id,
                name: user.name,
                role: user.role,
            }, secret, {
                issuer: "https://www.netguru.com/",
                subject: `${user.id}`,
                expiresIn: 30 * 60,
            }, (error, token) => {
                if (error) {
                    // return "err"
                    reject(error);
                }
                else {
                    resolve(token);
                }
            });
        }
    });
};
exports.default = {
    authFactory
    // AuthError,
};
