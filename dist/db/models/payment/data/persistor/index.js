"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPersistor = void 0;
const __1 = __importDefault(require(".."));
const data_1 = __importDefault(require("../../../invoice/data"));
class PaymentPersistor {
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
    async getByInvoiceId(invoiceId) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findAll({
                    where: { invoiceId: invoiceId }
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
                if (!payload.invoice?.id) {
                    rej("Invoice Id should not be null");
                    return;
                }
                const response = await __1.default.create({
                    ...payload,
                    createdAt: new Date(),
                    invoiceId: payload.invoice.id
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
exports.PaymentPersistor = PaymentPersistor;
//# sourceMappingURL=index.js.map