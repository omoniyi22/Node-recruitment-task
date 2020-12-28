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
const handleToken_1 = __importDefault(require("../../utils/handleToken"));
let supertest = require('supertest');
let app = require('./../../app');
let basic_token;
let premuim_token;
describe('User Test', () => {
    it("should signin a basic user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "basic-thomas",
            password: "sR-_pcoow-27-6PAwCD8"
        });
        expect(res.statusCode).toEqual(200);
        basic_token = res.body.data.token;
        done();
    }));
    it("should signin a premuim user", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "premium-jim",
            password: "GBLtTyq3E_UNjFnpo9m6",
        });
        expect(res.statusCode).toEqual(200);
        premuim_token = res.body.data.token;
        done();
    }));
    it("should decode premium token for payload", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let decoder = new handleToken_1.default().decodeToken;
        let decoded = yield decoder(premuim_token);
        expect(decoded).toEqual({
            userId: 434,
            name: 'Premium Jim',
            role: 'premium',
            iat: decoded.iat,
            exp: decoded.exp,
            iss: 'https://www.netguru.com/',
            sub: '434'
        });
        done();
    }));
    it("should decode basic token for payload", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let decoder = new handleToken_1.default().decodeToken;
        let decoded = yield decoder(basic_token);
        expect(decoded).toEqual({
            userId: 123,
            name: 'Basic Thomas',
            role: 'basic',
            iat: decoded.iat,
            exp: decoded.exp,
            iss: 'https://www.netguru.com/',
            sub: '123'
        });
        done();
    }));
    it("should fail if login credentials are wrong", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "omoniyi-stephen",
            password: "sR-6PAwCD8"
        });
        expect(res.body.error)
            .toEqual({ "name": "Failed Authentication" });
        done();
    }));
    it("should throw error message if password field is empty", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "basic-thomas",
            password: ""
        });
        expect(res.body.error.details[0].message)
            .toEqual("\"password\" is not allowed to be empty");
        done();
    }));
    it("should throw error message if username field is empty", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "",
            password: "sR-_pcoow-27-6PAwCD8"
        });
        expect(res.body.error.details[0].message)
            .toContain("\"username\" is not allowed to be empty");
        done();
    }));
    it("should throw error message if password field is missing", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            username: "basic-thomas"
        });
        expect(res.body.error.details[0].message)
            .toEqual("\"password\" is required");
        done();
    }));
    it("should throw error message if username field is missing", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield supertest(app).post('/api/v1/user/login')
            .send({
            password: "sR-_pcoow-27-6PAwCD8"
        });
        expect(res.body.error.details[0].message)
            .toContain("\"username\" is required");
        done();
    }));
});
