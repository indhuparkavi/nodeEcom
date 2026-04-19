import OrderModel from "..";
import UserModel from "../../../user/data/user";
import { Order } from "../../entity";


export class OrderPersistor {

    async getByUserId(id: string): Promise<Order[]> {
        return new Promise(async (res, rej) => {
            try {
                const response = await OrderModel.findAll({
                    include: [
                        { model: UserModel }
                    ]
                });
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
    async getById(id: string): Promise<Order> {
        return new Promise(async (res, rej) => {
            try {
                const response = await OrderModel.findOne({
                    where: { id: id },
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(payload: Order): Promise<Order> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.user?.id) {
                    rej("User Id should not be null")
                    return;
                }
                const response = await OrderModel.create({
                    ...payload,
                    code: `${(Math.floor(100000 + Math.random() * 900000))}a`,
                    orderedDate: new Date(),
                    userId: payload.user.id
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async update(id: string, payload: Order): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = await OrderModel.update(payload, {
                    where: { id: id }
                });
                if (response[0] > 0)
                    res(id);
            } catch (err) {
                rej(err)
            }
        })
    }
}