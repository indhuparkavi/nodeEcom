import PaymentModel from "..";
import InvoiceModel from "../../../invoice/data";
import { Payment } from "../../entity";


export class PaymentPersistor {

    async getById(id: string): Promise<Payment> {
        return new Promise(async (res, rej) => {
            try {
                const response = await PaymentModel.findOne({
                    where: { id: id },
                    include: [
                        { model: InvoiceModel }
                    ]
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async getByInvoiceId(invoiceId: string): Promise<Payment[]> {
        return new Promise(async (res, rej) => {
            try {
                const response = await PaymentModel.findAll({
                    where: { invoiceId: invoiceId }
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(payload: Payment): Promise<Payment> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.invoice?.id) {
                    rej("Invoice Id should not be null")
                    return;
                }
                const response = await PaymentModel.create({
                    ...payload,
                    createdAt: new Date(),
                    invoiceId: payload.invoice.id
                });
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async update(id: string, payload: Payment): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = await PaymentModel.update(payload, {
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