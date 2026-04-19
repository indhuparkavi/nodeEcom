import { Response } from "express"
import ApiError from "./entitys";

export function errorHandler(err: any, res: any) {
    console.log(err, "errerrerr");

    if (err instanceof ApiError) {
        res.status(err.statusCode).send(err)
    } else {
        res.status(417).send(new ApiError("An unknown issue occurred. Please try again later or contact support.", 417));
    }
}