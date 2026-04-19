"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = __importDefault(require("../../common/entitys"));
const persistor_1 = require("../data/persistor");
const services_1 = require("../../subCategory/services");
class DeliveryManagement {
    async deliveryById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.DeliveryPersistor().getById(id);
                if (!response) {
                    return rej(new entitys_1.default("Delivery not found", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async deliveryByOrderId(orderId) {
        return new Promise(async (res, rej) => {
            try {
                const order = new services_1.SubCategoryManagement().getById(orderId);
                if (!order) {
                    return rej(new entitys_1.default('Order not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                const response = new persistor_1.DeliveryPersistor().getByOrderId(orderId);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createDelivery(payload) {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new entitys_1.default(`Bad Request, missing attributes are ${err.join(',')}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const response = new persistor_1.DeliveryPersistor().create(payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async updateDelivery(id, payload) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.DeliveryPersistor().update(id, payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    validatorBody(address) {
        const missingAttributes = [];
        if (!address.estimatedDate) {
            missingAttributes.push("estimatedDate");
        }
        if (!address.deliveriedDate) {
            missingAttributes.push("deliveriedDate");
        }
        if (!address.status) {
            missingAttributes.push("status");
        }
        if (!address.trackingId) {
            missingAttributes.push("trackingId");
        }
        if (!address.order?.id) {
            missingAttributes.push("order id");
        }
        return missingAttributes;
    }
}
exports.DeliveryManagement = DeliveryManagement;
//# sourceMappingURL=index.js.map