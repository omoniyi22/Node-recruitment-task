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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const movies_route_1 = __importDefault(require("./routes/movies.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const config_1 = __importDefault(require("./config"));
dotenv.config();
const addPrefix = (name) => `/api/v1/${name}`;
const routes = [
    {
        name: addPrefix("movies"),
        route: movies_route_1.default
    },
    {
        name: addPrefix("user"),
        route: user_route_1.default
    },
];
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //Connect to Mongoose
        mongoose_1.default
            .connect(config_1.default.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            user: 'omoniyi',
            pass: 'omoniyi',
            dbName: '<dbname>'
        })
            .then(() => {
            console.log("connected successfully to mongoose");
        })
            .catch((err) => {
            console.log("Error connecting to mongodb", err);
            process.exit(1);
        });
        //configurations
        this.app.use(bodyParser.json());
        this.app.use(cors_1.default());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express_1.default.Router();
        routes.map((route) => {
            return this.app.use(route.name, route.route);
        });
        this.app.use("*", (req, res) => {
            res.status(400).send("404 NOT FOUND");
        });
    }
}
module.exports = new App().app;
