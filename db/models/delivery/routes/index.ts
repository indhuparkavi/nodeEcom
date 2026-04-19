import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { DeliveryManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken } from "../../../utils/auth";

export const deliveryRoute = Router();

deliveryRoute.get('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new DeliveryManagement();
            res.send(new SuccessResponse(await manage.deliveryById(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

deliveryRoute.get('/order/:orderId', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.orderId as string;
            const manage = new DeliveryManagement();
            res.send(new SuccessResponse(await manage.deliveryByOrderId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

deliveryRoute.post('/', verifyToken,
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new DeliveryManagement();
            res.send(new SuccessResponse(await manage.createDelivery(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

deliveryRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const body = req.body;
            const manage = new DeliveryManagement();
            res.send(new SuccessResponse(await manage.updateDelivery(id, body), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)