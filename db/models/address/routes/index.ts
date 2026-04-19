import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { AddressManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken } from "../../../utils/auth";

export const addressRoute = Router();

// addressRoute.get('/',
//     async (req, res) => {
//         try {
//             const manage = new AddressManagement();
//             res.send(new SuccessResponse(await manage.addresses(), 'Retrived successfully', StatusCodes.OK))
//         } catch (err) {
//             errorHandler(err, req)
//         }
//     }
// )

addressRoute.get('/user/:userId', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.userId as string
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.addressByUserId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

addressRoute.post('/',
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.createAddress(body), 'Category created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

addressRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const body = req.body;
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.updateAddress(id, body), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

addressRoute.delete('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new AddressManagement();
            res.send(new SuccessResponse(await manage.deleteAddress(id), 'Category deleted successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)
