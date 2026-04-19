import { response, Router } from "express";
import Role from "./data/role";
import { SuccessResponse } from "../common/entitys";
import { RoleManangement } from "./services";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../common/errorHandler";
import { verifyToken } from "../../utils/auth";


export const roleRoute = Router();

roleRoute.get('/', verifyToken,
    async (req, res) => {
        try {
            let roleManangement = new RoleManangement();
            res.send(new SuccessResponse(await roleManangement.roles(), 'Roles retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)
        }
    }
)

roleRoute.get('/:id', verifyToken,
    async (req, res) => {
        try {
            let id = req.params.id as string
            let roleManangement = new RoleManangement();
            res.send(new SuccessResponse(await roleManangement.roleById(id), 'Role retrived successfully', StatusCodes.OK))
        } catch (err) {
            errorHandler(err, res)

        }
    }
)