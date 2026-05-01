import { Router } from "express";
import { errorHandler } from "../common/errorHandler";
import { CategoryManagement } from "./services";
import { SuccessResponse } from "../common/entitys";
import { StatusCodes } from "http-status-codes";
import { Category } from "./entity";
import { verifyToken } from "../../middleware/verifyToken";


export const categoryRoute = Router();

categoryRoute.get('/', verifyToken,
    async (req, res) => {
        try {
            const categoryManagement = new CategoryManagement();
            res.send(new SuccessResponse(await categoryManagement.categories(), 'Categories retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, req);
        }
    }
)

categoryRoute.get('/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const categoryManagement = new CategoryManagement();
            res.send(new SuccessResponse(await categoryManagement.categoryById(id), 'Category retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

categoryRoute.post('/',
    async (req, res) => {
        try {
            const category = req.body;
            const categoryManagement = new CategoryManagement();
            res.send(new SuccessResponse(await categoryManagement.createCategory(transform(category)), 'Category created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

categoryRoute.put('/:id',
    async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const categoryManagement = new CategoryManagement();
            res.send(new SuccessResponse(await categoryManagement.updateCategory(id, transform(body)), 'Category updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

categoryRoute.delete('/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const categoryManagement = new CategoryManagement();
            res.send(new SuccessResponse(await categoryManagement.deleteCategory(id), 'Category deleted successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

// const transformBulk = (data: any) => {
//     return data.map((category: any) => transform(category))
// }

const transform = (data: any) => {

    let category = {} as Category;

    if (data.id) {
        category.id = data.id
    }

    if (data.name) {
        category.name = data.name;
    }
    return category
}