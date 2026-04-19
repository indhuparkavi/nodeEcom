"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = __importDefault(require("../../common/entitys"));
const persistor_1 = require("../data/persistor");
const services_1 = require("../../subCategory/services");
class ProductManagement {
    async products() {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.ProductPersistor().get();
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async productById(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.ProductPersistor().getById(id);
                if (!response) {
                    return rej(new entitys_1.default("Product not found", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async productsBySubCategoryId(subCategoryId) {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = new services_1.SubCategoryManagement().getById(subCategoryId);
                if (!subCategory) {
                    return rej(new entitys_1.default('Subcategory not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                const response = new persistor_1.ProductPersistor().getBySubCategroyId(subCategoryId);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createProduct(payload) {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new entitys_1.default(`Bad Request, missing attributes are ${err.join(',')}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const response = new persistor_1.ProductPersistor().create(payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async updateProduct(id, payload) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.ProductPersistor().update(id, payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async deleteProduct(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.ProductPersistor().delete(id);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    validatorBody(address) {
        const missingAttributes = [];
        if (!address.name) {
            missingAttributes.push("name");
        }
        if (!address.price) {
            missingAttributes.push("price");
        }
        if (!address.description) {
            missingAttributes.push("description");
        }
        if (!address.image) {
            missingAttributes.push("image");
        }
        if (!address.stock) {
            missingAttributes.push("stock");
        }
        if (!address.subCategory?.id) {
            missingAttributes.push("subCategory id");
        }
        return missingAttributes;
    }
}
exports.ProductManagement = ProductManagement;
//# sourceMappingURL=index.js.map