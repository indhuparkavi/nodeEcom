import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { OrderManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken } from "../../../utils/auth";

export const orderRoute = Router();

orderRoute.get('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new OrderManagement();
            res.send(new SuccessResponse(await manage.orderById(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

orderRoute.get('/user/:userId', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.userId as string
            const manage = new OrderManagement();
            res.send(new SuccessResponse(await manage.ordersForUser(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

orderRoute.post('/', verifyToken,
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new OrderManagement();
            res.send(new SuccessResponse(await manage.createOrder(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            console.log("1", err)
            errorHandler(err, res)
        }
    }
)

orderRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const body = req.body;
            const manage = new OrderManagement();
            res.send(new SuccessResponse(await manage.updateOrder(id, body), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)
