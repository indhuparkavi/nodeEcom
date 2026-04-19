import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { InvoiceManagement } from "../business";
import { verifyToken } from "../../../utils/auth";

export const invoiceRoute = Router();

invoiceRoute.get('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new InvoiceManagement();
            res.send(new SuccessResponse(await manage.InvoiceById(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

invoiceRoute.get('/user/:userId', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.userId as string;
            const manage = new InvoiceManagement();
            res.send(new SuccessResponse(await manage.invoiceByUserId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

invoiceRoute.get('/user/:orderId', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.orderId as string
            const manage = new InvoiceManagement();
            res.send(new SuccessResponse(await manage.invoiceByUserId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

invoiceRoute.post('/', verifyToken,
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new InvoiceManagement();
            res.send(new SuccessResponse(await manage.createInvoice(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

