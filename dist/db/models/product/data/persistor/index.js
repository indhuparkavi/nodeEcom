"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPersistor = void 0;
const __1 = __importDefault(require(".."));
const subCategory_1 = __importDefault(require("../../../subCategory/data/subCategory"));
class ProductPersistor {
    async get() {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findAll();
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
                    include: [
                        { model: subCategory_1.default }
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
    async getBySubCategroyId(subCategoryId) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findAll({
                    where: { subCategoryId: subCategoryId }
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
                if (!payload.subCategory?.id) {
                    rej("User Id should not be null");
                    return;
                }
                const response = await __1.default.create({
                    ...payload,
                    createdAt: new Date(),
                    subCategoryId: payload.subCategory.id
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
    async delete(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.destroy({
                    where: { id: id }
                });
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.ProductPersistor = ProductPersistor;
//# sourceMappingURL=index.js.map