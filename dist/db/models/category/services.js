"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryManagement = void 0;
const category_1 = __importDefault(require("./data/category"));
class CategoryManagement {
    async categories() {
        return new Promise(async (res, rej) => {
            try {
                const categories = await category_1.default.findAll();
                res(categories);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async categoryById(id) {
        return new Promise(async (res, rej) => {
            try {
                const category = await category_1.default.findOne({
                    where: { id: id }
                });
                if (category)
                    res(category);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createCategory(data) {
        return new Promise(async (res, rej) => {
            try {
                const categoryInfo = {
                    ...data,
                    createdAt: new Date(),
                };
                const category = await category_1.default.create(categoryInfo);
                if (category)
                    res(category);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async updateCategory(id, data) {
        return new Promise(async (res, rej) => {
            try {
                const category = await category_1.default.update(data, {
                    where: { id: id }
                });
                if (category)
                    res(data);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async deleteCategory(id) {
        return new Promise(async (res, rej) => {
            try {
                const category = await category_1.default.destroy({
                    where: { id: id }
                });
                res(category);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.CategoryManagement = CategoryManagement;
//# sourceMappingURL=services.js.map