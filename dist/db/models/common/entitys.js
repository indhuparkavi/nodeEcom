"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
class SuccessResponse {
    constructor(data = null, message = "", statusCode = http_status_codes_1.StatusCodes.OK) {
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}
exports.SuccessResponse = SuccessResponse;
class ApiError {
    constructor(errorMessage, statusCode) {
        this.err = errorMessage;
        this.statusCode = statusCode;
    }
}
exports.default = ApiError;
//# sourceMappingURL=entitys.js.map