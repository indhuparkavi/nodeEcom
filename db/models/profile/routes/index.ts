import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ProfileManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken } from "../../../utils/auth";

export const profileRoute = Router();

profileRoute.get('/user/:userId', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.userId as string
            const manage = new ProfileManagement();
            res.send(new SuccessResponse(await manage.profileByUserId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

profileRoute.post('/', verifyToken,
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new ProfileManagement();
            res.send(new SuccessResponse(await manage.createProfile(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

profileRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string;
            const body = req.body;
            const manage = new ProfileManagement();
            res.send(new SuccessResponse(await manage.updateProfile(id, body), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

