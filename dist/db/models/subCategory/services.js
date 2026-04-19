"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryManagement = void 0;
const subCategory_1 = __importDefault(require("./data/subCategory"));
class SubCategoryManagement {
    async getAll() {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await subCategory_1.default.findAll();
                res(subCategory);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async getById(id) {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await subCategory_1.default.findOne({
                    where: { id: id }
                });
                if (subCategory)
                    res(subCategory);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async create(data) {
        return new Promise(async (res, rej) => {
            try {
                const payload = {
                    ...data,
                    createdAt: new Date(),
                };
                const subCategory = await subCategory_1.default.create(payload);
                res(subCategory);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async update(id, data) {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await subCategory_1.default.update(data, {
                    where: { id: id }
                });
                if (subCategory)
                    res(data);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async delete(id) {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await subCategory_1.default.destroy({
                    where: { id: id }
                });
                res(subCategory);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.SubCategoryManagement = SubCategoryManagement;
//# sourceMappingURL=services.js.map