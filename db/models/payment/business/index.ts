import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { Payment } from "../entity";
import { PaymentPersistor } from "../data/persistor";
import { SubCategoryManagement } from "../../subCategory/services";


export class PaymentManagement {


    async paymentById(id: string): Promise<Payment> {
        return new Promise(async (res, rej) => {
            try {
                const response = new PaymentPersistor().getById(id);
                if (!response) {
                    return rej(new ApiError("Payment not found", StatusCodes.NOT_FOUND))
                }
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async paymentByInvoiceId(invoiceId: string): Promise<Payment[]> {
        return new Promise(async (res, rej) => {
            try {
                const invoice = new SubCategoryManagement().getById(invoiceId);
                if (!invoice) {
                    return rej(new ApiError('Subcategory not found', StatusCodes.NOT_FOUND))
                }
                const response = new PaymentPersistor().getByInvoiceId(invoiceId);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async createPayment(payload: Payment): Promise<Payment> {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const response = new PaymentPersistor().create(payload)
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async updatePayment(id: string, payload: Payment): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = new PaymentPersistor().update(id, payload);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    validatorBody(payload: Payment) {
        const missingAttributes = []
        if (!payload.status) {
            missingAttributes.push("status")
        }
        if (!payload.invoice.id) {
            missingAttributes.push("invoice id")
        }
        return missingAttributes
    }

}

