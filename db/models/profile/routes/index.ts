import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ProfileManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { userAccess } from "../../../middleware/verifyUserPermission";
import { verifyToken, AuthRequest } from "../../../middleware/verifyToken";

export const profileRoute = Router();

profileRoute.get('/user', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const id = req.user.id as string
            const manage = new ProfileManagement();
            res.send(new SuccessResponse(await manage.profileByUserId(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

profileRoute.post('/', verifyToken, userAccess,
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

profileRoute.put('/:id', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const id = req.params.id as string;
            const body = req.body;
            const manage = new ProfileManagement();
            res.send(new SuccessResponse(await manage.updateProfile(id, req.user.id, body), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

