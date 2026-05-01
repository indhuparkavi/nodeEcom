import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { PaymentManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken } from "../../../middleware/verifyToken";

export const paymentRoute = Router();

paymentRoute.get('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new PaymentManagement();
            res.send(new SuccessResponse(await manage.paymentById(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

paymentRoute.get('/invoice/:invoiceId', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.invoiceId as string
            const manage = new PaymentManagement();
            res.send(new SuccessResponse(await manage.paymentByInvoiceId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

paymentRoute.post('/', verifyToken,
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new PaymentManagement();
            res.send(new SuccessResponse(await manage.createPayment(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

paymentRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const body = req.body;
            const manage = new PaymentManagement();
            res.send(new SuccessResponse(await manage.updatePayment(id, body), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

