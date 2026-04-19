"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPersistor = void 0;
const __1 = __importDefault(require(".."));
const data_1 = __importDefault(require("../../../order/data"));
class DeliveryPersistor {
    async getById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findOne({
                    where: { id: id },
                    include: [
                        { model: data_1.default }
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
    async getByOrderId(orderId) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findAll({
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
                if (!payload.order?.id) {
                    rej("Order Id should not be null");
                    return;
                }
                const response = await __1.default.create({
                    ...payload,
                    createdAt: new Date(),
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
exports.DeliveryPersistor = DeliveryPersistor;
//# sourceMappingURL=index.js.map