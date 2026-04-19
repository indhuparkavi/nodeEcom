import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { Product } from "../entity";
import { ProductPersistor } from "../data/persistor";
import { SubCategoryManagement } from "../../subCategory/services";


export class ProductManagement {

    async products(): Promise<Product[]> {
        return new Promise(async (res, rej) => {
            try {
                const response = new ProductPersistor().get();
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async productById(id: string): Promise<Product | null> {
        return new Promise(async (res, rej) => {
            try {
                const response = new ProductPersistor().getById(id);
                if (!response) {
                    return rej(new ApiError("Product not found", StatusCodes.NOT_FOUND))
                } else res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
    async productsBySubCategoryId(subCategoryId: string): Promise<Product[]> {
        return new Promise(async (res, rej) => {
            try {
                const subCategory = new SubCategoryManagement().getById(subCategoryId);
                if (!subCategory) {
                    return rej(new ApiError('Subcategory not found', StatusCodes.NOT_FOUND))
                }
                const response = new ProductPersistor().getBySubCategroyId(subCategoryId);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
    async createProduct(payload: Product): Promise<Product> {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const productPersistor = new ProductPersistor()
                const checkUnique = await productPersistor.getByName(payload.name);
                if (checkUnique) {
                    return rej(new ApiError(`Product already exist`, StatusCodes.CONFLICT))
                }
                const response = productPersistor.create(payload)
                res(response);
            } catch (err) {
                console.log(err)
                rej(err)
            }
        })
    }

    async updateProduct(id: string, payload: Product): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = new ProductPersistor().update(id, payload);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async deleteProduct(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const response = new ProductPersistor().delete(id);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    validatorBody(address: Product) {
        const missingAttributes = []
        if (!address.name) {
            missingAttributes.push("name")
        }
        if (!address.price) {
            missingAttributes.push("price")
        }
        if (!address.description) {
            missingAttributes.push("description")
        }
        if (!address.image) {
            missingAttributes.push("image")
        }
        if (!address.stock) {
            missingAttributes.push("stock")
        }
        if (!address.subCategory?.id) {
            missingAttributes.push("subCategory id")
        }
        return missingAttributes
    }

}

