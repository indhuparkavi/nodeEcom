import { SubCategory } from "./entity";

import SubCategoryModel from "./data/subCategory"


export class SubCategoryManagement {

    async getAll(): Promise<SubCategory[]> {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await SubCategoryModel.findAll();
                res(subCategory);
            } catch (err) {
                rej(err)
            }
        })
    }

    async getById(id: string): Promise<SubCategory> {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await SubCategoryModel.findOne({
                    where: { id: id }
                });
                if (subCategory)
                    res(subCategory);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(data: SubCategory): Promise<SubCategory> {
        return new Promise(async (res, rej) => {
            try {
                const payload = {
                    ...data,
                    createdAt: new Date(),
                }
                const subCategory = await SubCategoryModel.create(payload);
                res(subCategory)
            } catch (err) {
                rej(err)
            }
        })
    }

    async update(id: string, data: SubCategory): Promise<SubCategory> {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await SubCategoryModel.update(data, {
                    where: { id: id }
                });
                if (subCategory)
                    res(data);
            } catch (err) {
                rej(err)
            }
        })
    }

    async delete(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = await SubCategoryModel.destroy({
                    where: { id: id }
                });
                res(subCategory);
            } catch (err) {
                rej(err)
            }
        })
    }
}   