"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = __importDefault(require("../../common/entitys"));
const persistor_1 = require("../data/persistor");
const persistor_2 = require("../../user/data/persistor");
class OrderManagement {
    async orderById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.OrderPersistor().getById(id);
                if (!response) {
                    return rej(new entitys_1.default("Order not found", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async ordersForUser(userId) {
        return new Promise(async (res, rej) => {
            try {
                const user = new persistor_2.UserPersistor().getById(userId);
                if (!user) {
                    return rej(new entitys_1.default('User not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                const response = new persistor_1.OrderPersistor().getByUserId(userId);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createOrder(payload) {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new entitys_1.default(`Bad Request, missing attributes are ${err.join(',')}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const response = new persistor_1.OrderPersistor().create(payload);
                res(response);
            }
            catch (err) {
                console.log(err, 'err');
                rej(err);
            }
        });
    }
    async updateOrder(id, payload) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.OrderPersistor().update(id, payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    validatorBody(address) {
        const missingAttributes = [];
        if (!address.quantity) {
            missingAttributes.push("quantity");
        }
        if (!address.status) {
            missingAttributes.push("status");
        }
        if (!address.sellingPrice) {
            missingAttributes.push("sellingPrice");
        }
        if (!address.user?.id) {
            missingAttributes.push("user id");
        }
        return missingAttributes;
    }
}
exports.OrderManagement = OrderManagement;
//# sourceMappingURL=index.js.map