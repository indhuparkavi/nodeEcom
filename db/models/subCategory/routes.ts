import { Router } from "express";
import { SubCategory } from "./entity";
import { SubCategoryManagement } from "./services";
import { SuccessResponse } from "../common/entitys";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../common/errorHandler";
import { verifyToken } from "../../utils/auth";

export const subCategoryRoute = Router();

subCategoryRoute.get('/', verifyToken,
    async (req, res) => {
        try {
            const subCategoryManagement = new SubCategoryManagement();
            res.send(new SuccessResponse(await subCategoryManagement.getAll(), 'SubCategory retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

subCategoryRoute.get('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const subCategoryManagement = new SubCategoryManagement();
            res.send(new SuccessResponse(await subCategoryManagement.getById(id), 'Category retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

subCategoryRoute.post('/', verifyToken,
    async (req, res) => {
        try {
            const category = req.body;
            console.log(category)
            const subCategoryManagement = new SubCategoryManagement();
            res.send(new SuccessResponse(await subCategoryManagement.create(transform(category)), 'Category created successfully', StatusCodes.CREATED))
        } catch (err) {
            console.log(err, 'err')
            errorHandler(err, res)
        }
    }
)

subCategoryRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const body = req.body;
            const subCategoryManagement = new SubCategoryManagement();
            res.send(new SuccessResponse(await subCategoryManagement.update(id, transform(body)), 'Category updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

subCategoryRoute.delete('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const subCategoryManagement = new SubCategoryManagement();
            res.send(new SuccessResponse(await subCategoryManagement.delete(id), 'Category deleted successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

const transform = (data: any) => {

    let subCategory = {} as SubCategory;

    if (data.id) {
        subCategory.id = data.id
    }

    if (data.name) {
        subCategory.name = data.name;
    }

    if (data.categoryId) {
        subCategory.categoryId = data.categoryId
    }
    return subCategory;
}