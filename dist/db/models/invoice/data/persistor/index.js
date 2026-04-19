"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePersistor = void 0;
const __1 = __importDefault(require(".."));
const data_1 = __importDefault(require("../../../order/data"));
const user_1 = __importDefault(require("../../../user/data/user"));
class InvoicePersistor {
    async getById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findOne({
                    where: { id: id },
                    include: [
                        { model: data_1.default },
                        { model: user_1.default }
                    ]
                });
                if (response)
                    res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async getByUserId(userId) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findAll({
                    where: { userId: userId }
                });
                if (response)
                    res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async getByOrderId(orderId) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findOne({
                    where: { orderId: orderId }
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
                if (!payload.order?.id || !payload.user.id) {
                    rej("User Id or order id should not be null");
                    return;
                }
                const response = await __1.default.create({
                    ...payload,
                    createdAt: new Date(),
                    userId: payload.user.id,
                    orderId: payload.order.id
                });
                if (response)
                    res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.InvoicePersistor = InvoicePersistor;
//# sourceMappingURL=index.js.map