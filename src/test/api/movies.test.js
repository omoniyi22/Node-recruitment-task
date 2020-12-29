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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
let { MovieModel } = require("./../../components/Movies/model");
let supertest = require('supertest');
let app = require('./../../app');
let basic_token;
let premuim_token;
let title = "fast";
describe('User and Movie Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = config_1.default.MONGO_URI;
            yield mongoose_1.default.connect(url, { useNewUrlParser: true });
            MovieModel.deleteMany({});
        }
        catch (error) {
            console.log(error);
        }
    }));
    afterAll(() => MovieModel.deleteMany({}));
    it("it should signin a basic user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "basic-thomas",
            password: "sR-_pcoow-27-6PAwCD8"
        });
        expect(res.statusCode).toEqual(200);
        basic_token = res.body.data.token;
        done();
    }));
    it("it should signin a premuim user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "premium-jim",
            password: "GBLtTyq3E_UNjFnpo9m6",
        });
        expect(res.statusCode).toEqual(200);
        premuim_token = res.body.data.token;
        done();
    }));
    it("Basic user can create only four movies in a month", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let Movie = yield supertest(app)
            .post('/api/v1/movies')
            .set('Authorization', `Bearer ${basic_token}`)
            .send({ title });
        if (Movie.statusCode !== 400) {
            for (let i = 0; i < 5; i++) {
                if (i > 4) {
                    expect(Movie.body)
                        .toEqual({
                        message: "You have reach the limit for basic user" +
                            "let's switch to Premium",
                        error: "Internal Error"
                    });
                }
                else {
                    expect(Movie.body.data.title).toMatch(RegExp(title, "i"));
                }
                done();
            }
        }
        else {
            expect(Movie.body.error.message)
                .toEqual("getaddrinfo ENOTFOUND www.omdbapi.com www.omdbapi.com:80");
            done();
        }
    }), 20000);
    it("Premium user can create more than four movies in a month", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let Movie = yield supertest(app)
            .post('/api/v1/movies')
            .set('Authorization', `Bearer ${premuim_token}`)
            .send({ title });
        if (Movie.statusCode !== 400) {
            for (let i = 0; i < 5; i++) {
                if (i > 4) {
                    // After 4 movies, it kept on creating movies
                    expect(Movie.body.data.title).toMatch(RegExp(title, "i"));
                }
                else {
                    expect(Movie.body.data.title).toMatch(RegExp(title, "i"));
                }
                done();
            }
        }
        else {
            expect(Movie.body.error.message)
                .toEqual("getaddrinfo ENOTFOUND www.omdbapi.com www.omdbapi.com:80");
            done();
        }
    }), 20000);
    it("should throw an error message if token fail", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let Movie = yield supertest(app)
            .post('/api/v1/movies')
            .set('Authorization', `Bearer ${premuim_token + "wrong_token"}`)
            .send({});
        expect(Movie.body.message)
            .toEqual("Failed to authenticate token.");
        done();
    }), 6000);
    it("should throw an error message if title is missing", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let Movie = yield supertest(app)
            .post('/api/v1/movies')
            .set('Authorization', `Bearer ${premuim_token}`)
            .send({});
        expect(Movie.body.error.details[0].message)
            .toEqual("\"title\" is required");
        done();
    }), 20000);
    it("should throw an error message if title is empty", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let Movie = yield supertest(app)
            .post('/api/v1/movies')
            .set('Authorization', `Bearer ${premuim_token}`)
            .send({ title: "" });
        expect(Movie.body.error.details[0].message)
            .toEqual("\"title\" is not allowed to be empty");
        done();
    }), 20000);
});
