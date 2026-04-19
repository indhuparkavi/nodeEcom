import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { Order } from "../entity";
import { OrderPersistor } from "../data/persistor";
import { UserPersistor } from "../../user/data/persistor";


export class OrderManagement {

    async orderById(id: string): Promise<Order> {
        return new Promise(async (res, rej) => {
            try {
                const response = new OrderPersistor().getById(id);
                if (!response) {
                    return rej(new ApiError("Order not found", StatusCodes.NOT_FOUND))
                }
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
    async ordersForUser(userId: string): Promise<Order[]> {
        return new Promise(async (res, rej) => {
            try {
                const user = new UserPersistor().getById(userId);
                if (!user) {
                    return rej(new ApiError('User not found', StatusCodes.NOT_FOUND))
                }
                const response = new OrderPersistor().getByUserId(userId);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async createOrder(payload: Order): Promise<Order> {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const response = new OrderPersistor().create(payload)
                res(response);
            } catch (err) {
                console.log(err, 'err');

                rej(err)
            }
        })
    }

    async updateOrder(id: string, payload: Order): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = new OrderPersistor().update(id, payload);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    validatorBody(address: Order) {
        const missingAttributes = []
        if (!address.quantity) {
            missingAttributes.push("quantity")
        }
        if (!address.status) {
            missingAttributes.push("status")
        }
        if (!address.sellingPrice) {
            missingAttributes.push("sellingPrice")
        }
        if (!address.user?.id) {
            missingAttributes.push("user id")
        }
        return missingAttributes
    }

}

