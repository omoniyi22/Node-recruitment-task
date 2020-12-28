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
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./../model");
class MovieRepository {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (data) {
                    yield this.model
                        .create(data)
                        .then((response) => {
                        if (response)
                            resolve(response);
                    })
                        .catch((error) => {
                        //console.log(error);
                        reject(error);
                    });
                }
            }));
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (query) {
                    yield this.model
                        .findOne(query)
                        .then((response) => {
                        if (!response)
                            return resolve(false);
                        if (response)
                            return resolve(response);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
            }));
        });
    }
    update(_id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (query) {
                    yield this.model
                        .findOneAndUpdate({ _id }, query, { new: true })
                        .then((result) => {
                        if (!result)
                            return reject("Update failed");
                        resolve(result);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
            }));
        });
    }
    get(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (query) {
                    yield this.model
                        .find(query)
                        .then((response) => {
                        if (!response)
                            return reject("No record found");
                        if (response)
                            resolve(response);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
            }));
        });
    }
    getDetails(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (query) {
                    return yield this.model
                        .findOne(query)
                        .then((response) => {
                        if (!response)
                            return reject("No record found");
                        response.password = null;
                        if (response)
                            resolve(response);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
            }));
        });
    }
}
exports.default = new MovieRepository(model_1.MovieModel);
