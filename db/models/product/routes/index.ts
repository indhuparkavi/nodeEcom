import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken } from "../../../middleware/verifyToken";

export const productRoute = Router();

productRoute.get('/:id',
    async (req, res) => {
        try {
            const id = req.params.id;
            const manage = new ProductManagement();
            res.send(new SuccessResponse(await manage.productById(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

productRoute.get('/', verifyToken,
    async (req, res) => {
        try {
            const manage = new ProductManagement();
            res.send(new SuccessResponse(await manage.products(), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

productRoute.post('/', verifyToken,
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new ProductManagement();
            res.send(new SuccessResponse(await manage.createProduct(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

productRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string;
            const body = req.body;
            const manage = new ProductManagement();
            res.send(new SuccessResponse(await manage.updateProduct(id, body), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

productRoute.delete('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new ProductManagement();
            res.send(new SuccessResponse(await manage.deleteProduct(id), 'Deleted successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

