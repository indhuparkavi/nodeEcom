import InvoiceModel from "..";
import OrderModel from "../../../order/data";
import SubCategoryModel from "../../../subCategory/data/subCategory";
import UserModel from "../../../user/data/user";
import { Invoice } from "../../entity";


export class InvoicePersistor {

    async getById(id: string): Promise<Invoice> {
        return new Promise(async (res, rej) => {
            try {
                const response = await InvoiceModel.findOne({
                    where: { id: id },
                    include: [
                        { model: OrderModel },
                        { model: UserModel }
                    ]
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async getByUserId(userId: string): Promise<Invoice[]> {
        return new Promise(async (res, rej) => {
            try {
                const response = await InvoiceModel.findAll({
                    where: { userId: userId }
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async getByOrderId(orderId: string): Promise<Invoice> {
        return new Promise(async (res, rej) => {
            try {
                const response = await InvoiceModel.findOne({
                    where: { orderId: orderId }
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }


    async create(payload: Invoice): Promise<Invoice> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.order?.id || !payload.user.id) {
                    rej("User Id or order id should not be null")
                    return;
                }
                const response = await InvoiceModel.create({
                    ...payload,
                    createdAt: new Date(),
                    userId: payload.user.id,
                    orderId: payload.order.id
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
}