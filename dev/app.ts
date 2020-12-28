import * as bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import MoviesRouter from "./routes/movies.route";
import UserRouter from "./routes/user.route";
import config from "./config";
dotenv.config();

const addPrefix = (name: string) => `/api/v1/${name}`;

const routes = [
  {
    name: addPrefix("movies"),
    route: MoviesRouter
  },
  {
    name: addPrefix("user"),
    route: UserRouter
  },
];

interface IClassFunctions {
  err: string;
  config(): void;
  routes(): void;
}

class App implements IClassFunctions {
  public err: string;
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    //Connect to Mongoose

    mongoose
      .connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        user: 'omoniyi', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
        pass: 'omoniyi', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
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
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public routes(): void {
    let router: express.Router = express.Router();
    routes.map((route) => {
      return this.app.use(route.name, route.route);
    });

    this.app.use("*", (req, res) => {
      res.status(400).send("404 NOT FOUND");
    });
  }
}

module.exports = new App().app;
