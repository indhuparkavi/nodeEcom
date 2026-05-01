import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthManagement } from "../business";
import { SuccessResponse } from "../../common/entitys";
import { errorHandler } from "../../common/errorHandler";

export const authRoute = Router();

authRoute.post('/customer/signUp',
    async (req, res) => {
        try {
            const manage = new AuthManagement();
            res.send(new SuccessResponse(await manage.signUp(req.body, "customer"), 'Created successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

authRoute.post('/seller/signUp',
    async (req, res) => {
        try {
            const manage = new AuthManagement();
            res.send(new SuccessResponse(await manage.signUp(req.body, "seller"), 'Created successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

authRoute.post('/login',
    async (req, res) => {
        try {
            const body = req.body;
            const manage = new AuthManagement();
            res.send(new SuccessResponse(await manage.login(body), 'Successfully Login', StatusCodes.CREATED))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)



