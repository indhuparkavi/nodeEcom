import { Category } from "./entity";

import CategoryModel from "./data/category"


export class CategoryManagement {
    async categories(): Promise<Category[]> {
        return new Promise(async (res, rej) => {
            try {
                const categories = await CategoryModel.findAll();
                res(categories);
            } catch (err) {
                rej(err)
            }
        })
    }
    async categoryById(id: string): Promise<Category> {
        return new Promise(async (res, rej) => {
            try {
                const category = await CategoryModel.findOne({
                    where: { id: id }
                });
                if (category)
                    res(category);
            } catch (err) {
                rej(err)
            }
        })
    }
    async createCategory(data: Category): Promise<Category> {
        return new Promise(async (res, rej) => {
            try {
                const categoryInfo = {
                    ...data,
                    createdAt: new Date(),
                }
                const category = await CategoryModel.create(categoryInfo);
                if (category)
                    res(category);
            } catch (err) {
                rej(err)
            }
        })
    }
    async updateCategory(id: string, data: Category): Promise<Category> {
        return new Promise(async (res, rej) => {
            try {
                const category = await CategoryModel.update(data, {
                    where: { id: id }
                });
                if (category)
                    res(data);
            } catch (err) {
                rej(err)
            }
        })
    }

    async deleteCategory(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const category = await CategoryModel.destroy({
                    where: { id: id }
                });
                res(category);
            } catch (err) {
                rej(err)
            }
        })
    }
}