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
const env = require("dotenv");
env.config();
const verifyUserToken = (req, res, next) => {
    //console.log({ s: req.body.search })
    let token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
        return res
            .status(401)
            .send({ auth: false, error: `Authentication error. Token required.` });
    }
    try {
        token = token.toString();
    }
    catch (err) {
        return res.status(401).send({ auth: false, error: "Invalid token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res
                .status(401)
                .send({ auth: false, err, message: "Failed to authenticate token." });
        }
        else {
            //console.log({ decoded })
            req.user = decoded;
        }
        // if everything good, save to request for use in other routes
        const user = {};
        next();
    });
};
exports.default = verifyUserToken;
