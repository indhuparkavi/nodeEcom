import DeliveryModel from "..";
import OrderModel from "../../../order/data";
import { Delivery } from "../../entity";


export class DeliveryPersistor {

    async getById(id: string): Promise<Delivery> {
        return new Promise(async (res, rej) => {
            try {
                const response = await DeliveryModel.findOne({
                    where: { id: id },
                    include: [
                        { model: OrderModel }
                    ]
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async getByOrderId(orderId: string): Promise<Delivery[]> {
        return new Promise(async (res, rej) => {
            try {
                const response = await DeliveryModel.findAll({
                    where: { orderId: orderId }
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(payload: Delivery): Promise<Delivery> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.order?.id) {
                    rej("Order Id should not be null")
                    return;
                }
                const response = await DeliveryModel.create({
                    ...payload,
                    createdAt: new Date(),
                    orderId: payload.order.id
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async update(id: string, payload: Delivery): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = await DeliveryModel.update(payload, {
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