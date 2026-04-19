"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const entitys_1 = __importDefault(require("./entitys"));
function errorHandler(err, res) {
    console.log(err, "errerrerr");
    if (err instanceof entitys_1.default) {
        res.status(err.statusCode).send(err);
    }
    else {
        res.status(417).send(new entitys_1.default("An unknown issue occurred. Please try again later or contact support.", 417));
    }
}
//# sourceMappingURL=errorHandler.js.map