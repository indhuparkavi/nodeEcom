import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken, AuthRequest } from "../../../middleware/verifyToken";
import { AuthManagement } from "../../auth/business";
import { User } from "../entity";
import { userAccess } from "../../../middleware/verifyUserPermission";


export const userRoute = Router();

userRoute.get('/', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const manage = new UserManagement();
            res.send(new SuccessResponse(await manage.users(req.user), 'Retrived successfully', StatusCodes.OK));
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

userRoute.get('/:id', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const id = req.params.id as string
            const manage = new UserManagement();
            res.send(new SuccessResponse(await manage.user(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

userRoute.post('/', verifyToken, userAccess,
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new UserManagement();
            res.send(new SuccessResponse(await manage.createUser(body), 'Created successfully', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

userRoute.delete('/:id', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const id = req.params.id as string
            const management = new UserManagement();
            res.send(new SuccessResponse(await management.deleteUser(id), 'Deleted successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

userRoute.put('/resetPassword', verifyToken, userAccess,
    async (req: AuthRequest, res) => {
        try {
            const body = req.body;
            const user = req.user as User;
            const management = new AuthManagement();
            res.send(new SuccessResponse(await management.resetPassword(body, user), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)


