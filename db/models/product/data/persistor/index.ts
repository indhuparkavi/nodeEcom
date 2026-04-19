import ProductModel from "..";
import SubCategoryModel from "../../../subCategory/data/subCategory";
import { Product } from "../../entity";


export class ProductPersistor {
    async get(): Promise<Product[]> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProductModel.findAll();
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async getById(id: string): Promise<Product | null> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProductModel.findOne({
                    where: { id: id },
                    include: [
                        { model: SubCategoryModel }
                    ]
                });
                if (response)
                    res(response);
                else res(null)
            } catch (err) {
                rej(err)
            }
        })
    }

    async getByName(name: string): Promise<Product | null> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProductModel.findOne({
                    where: { name: name },
                    include: [
                        { model: SubCategoryModel }
                    ]
                });
                if (response)
                    res(response);
                else res(null)
            } catch (err) {
                rej(err)
            }
        })
    }

    async getBySubCategroyId(subCategoryId: string): Promise<Product[]> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProductModel.findAll({
                    where: { subCategoryId: subCategoryId }
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(payload: Product): Promise<Product> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.subCategory?.id) {
                    rej("User Id should not be null")
                    return;
                }
                const response = await ProductModel.create({
                    ...payload,
                    createdAt: new Date(),
                    subCategoryId: payload.subCategory.id
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async update(id: string, payload: Product): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProductModel.update(payload, {
                    where: { id: id }
                });
                if (response[0] > 0)
                    res(id);
            } catch (err) {
                rej(err)
            }
        })
    }

    async delete(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProductModel.destroy({
                    where: { id: id }
                });
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
}