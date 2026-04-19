"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPersistor = void 0;
const __1 = __importDefault(require(".."));
const user_1 = __importDefault(require("../../../user/data/user"));
class OrderPersistor {
    async getByUserId(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findAll({
                    include: [
                        { model: user_1.default }
                    ]
                });
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async getById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findOne({
                    where: { id: id },
                });
                if (response)
                    res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async create(payload) {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.user?.id) {
                    rej("User Id should not be null");
                    return;
                }
                const response = await __1.default.create({
                    ...payload,
                    code: `${(Math.floor(100000 + Math.random() * 900000))}a`,
                    orderedDate: new Date(),
                    userId: payload.user.id
                });
                if (response)
                    res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async update(id, payload) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.update(payload, {
                    where: { id: id }
                });
                if (response[0] > 0)
                    res(id);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.OrderPersistor = OrderPersistor;
//# sourceMappingURL=index.js.map