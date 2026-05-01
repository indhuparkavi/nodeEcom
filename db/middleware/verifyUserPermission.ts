import { NextFunction, Response } from "express";
import { AuthRequest } from "./verifyToken";
import { User } from "../models/user/entity";
import { permissions, Role } from "../../permissions";
import ApiError from "../models/common/entitys";
import { StatusCodes } from "http-status-codes";

const map = new Map();
map.set("post", "create");
map.set("put", "update");
map.set("get", "get")
map.set("delete", "delete");


export const userAccess = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {
        const user = req.user as User;

        const resource = req.baseUrl.match(/\/api\/([^\/]+)/)?.[1];
        const method = req.method.toLowerCase();

        if (!resource) {
            return res.status(400).json({ message: "Invalid resource" });
        }

        const hasPermission = permissions.some(permission =>
            permission.role === user.role.name &&
            permission.resources.some(resourceInfo =>
                resourceInfo.resource === resource &&
                resourceInfo.authorize.some(auth => map.get(method) === auth.name)
            )
        );

        if (!hasPermission) {
            throw new ApiError("Forbidden: Permission denied", StatusCodes.FORBIDDEN)
        }
        next();
    } catch (error) {
        throw new ApiError("Forbidden: Permission denied", StatusCodes.FORBIDDEN)
    }
}