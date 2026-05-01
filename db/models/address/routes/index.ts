import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { AddressManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { AuthRequest, verifyToken } from "../../../middleware/verifyToken";
import { userAccess } from "../../../middleware/verifyUserPermission";

export const addressRoute = Router();

addressRoute.get('/user', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const id = req.user.id as string
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.addressByUserId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

addressRoute.post('/', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const body = req.body;
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.createAddress(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

addressRoute.put('/:id', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const id = req.params.id as string
            const body = req.body;
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.updateAddress(id, body, req.user.id), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

addressRoute.delete('/:id', verifyToken, userAccess,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.deleteAddress(id), 'Deleted successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

addressRoute.get('/default', verifyToken, userAccess,
    async (req, res) => {
        try {
            const id = req.params.id as string

            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.deleteAddress(id), 'Retrived successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)