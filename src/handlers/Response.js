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
class Responses {
    constructor() {
        this.SuccessResponse = this.SuccessResponse.bind(this);
        this.ErrorResponse = this.ErrorResponse.bind(this);
    }
    SuccessResponse(res, code, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const _data = {
                message,
                data,
            };
            return res.status(code).json(_data);
        });
    }
    ErrorResponse(res, code, message, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const _error = {
                message,
                error,
            };
            return res.status(code).json(_error);
        });
    }
}
exports.default = Responses;
