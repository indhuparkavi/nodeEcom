import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";
import { verifyToken } from "../../../utils/auth";


export const userRoute = Router();

userRoute.get('/', verifyToken,
    async (req, res) => {
        try {
            const manage = new UserManagement();
            res.send(new SuccessResponse(await manage.users(), 'Retrived successfully', StatusCodes.OK));
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

userRoute.post('/login',
    async (req, res) => {
        try {
            const manage = new UserManagement();
            const body = req.body
            res.send(new SuccessResponse(await manage.loginExistingUser(body)))
        } catch (err) {
            return errorHandler(err, res)
        }
    }
)

userRoute.get('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const manage = new UserManagement();
            res.send(new SuccessResponse(await manage.user(id), 'Retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

userRoute.post('/',
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

userRoute.delete('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string
            const management = new UserManagement();
            res.send(new SuccessResponse(await management.deleteUser(id), 'Deleted successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

userRoute.put('/:id', verifyToken,
    async (req, res) => {
        try {
            const id = req.params.id as string;
            const payload = req.body
            const management = new UserManagement();
            res.send(new SuccessResponse(await management.update(id, payload), 'Updated successfully', StatusCodes.ACCEPTED))
        } catch (err) {
            errorHandler(err, req)
        }
    }
)

