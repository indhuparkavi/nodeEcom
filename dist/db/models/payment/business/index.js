"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = __importDefault(require("../../common/entitys"));
const persistor_1 = require("../data/persistor");
const services_1 = require("../../subCategory/services");
class PaymentManagement {
    async paymentById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.PaymentPersistor().getById(id);
                if (!response) {
                    return rej(new entitys_1.default("Payment not found", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async paymentByInvoiceId(invoiceId) {
        return new Promise(async (res, rej) => {
            try {
                const invoice = new services_1.SubCategoryManagement().getById(invoiceId);
                if (!invoice) {
                    return rej(new entitys_1.default('Subcategory not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                const response = new persistor_1.PaymentPersistor().getByInvoiceId(invoiceId);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createPayment(payload) {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new entitys_1.default(`Bad Request, missing attributes are ${err.join(',')}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const response = new persistor_1.PaymentPersistor().create(payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async updatePayment(id, payload) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.PaymentPersistor().update(id, payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    validatorBody(payload) {
        const missingAttributes = [];
        if (!payload.status) {
            missingAttributes.push("status");
        }
        if (!payload.invoice.id) {
            missingAttributes.push("invoice id");
        }
        return missingAttributes;
    }
}
exports.PaymentManagement = PaymentManagement;
//# sourceMappingURL=index.js.map