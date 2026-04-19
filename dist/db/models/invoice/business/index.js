"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = __importDefault(require("../../common/entitys"));
const services_1 = require("../../subCategory/services");
const persistor_1 = require("../data/persistor");
class InvoiceManagement {
    async InvoiceById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.InvoicePersistor().getById(id);
                if (!response) {
                    return rej(new entitys_1.default("Invoice not found", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async invoiceByOrderId(orderId) {
        return new Promise(async (res, rej) => {
            try {
                const order = new services_1.SubCategoryManagement().getById(orderId);
                if (!order) {
                    return rej(new entitys_1.default('Subcategory not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                const response = new persistor_1.InvoicePersistor().getByOrderId(orderId);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async invoiceByUserId(userId) {
        return new Promise(async (res, rej) => {
            try {
                const order = new services_1.SubCategoryManagement().getById(userId);
                if (!order) {
                    return rej(new entitys_1.default('Subcategory not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                const response = new persistor_1.InvoicePersistor().getByUserId(userId);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createInvoice(payload) {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new entitys_1.default(`Bad Request, missing attributes are ${err.join(',')}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const response = new persistor_1.InvoicePersistor().create(payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    validatorBody(address) {
        const missingAttributes = [];
        if (!address.order) {
            missingAttributes.push("price");
        }
        if (!address.user) {
            missingAttributes.push("description");
        }
        return missingAttributes;
    }
}
exports.InvoiceManagement = InvoiceManagement;
//# sourceMappingURL=index.js.map