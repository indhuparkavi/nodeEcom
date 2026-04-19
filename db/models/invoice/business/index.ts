import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { SubCategoryManagement } from "../../subCategory/services";
import { Invoice } from "../entity";
import { InvoicePersistor } from "../data/persistor";


export class InvoiceManagement {


    async InvoiceById(id: string): Promise<Invoice> {
        return new Promise(async (res, rej) => {
            try {
                const response = new InvoicePersistor().getById(id);
                if (!response) {
                    return rej(new ApiError("Invoice not found", StatusCodes.NOT_FOUND))
                }
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async invoiceByOrderId(orderId: string): Promise<Invoice> {
        return new Promise(async (res, rej) => {
            try {
                const order = new SubCategoryManagement().getById(orderId);
                if (!order) {
                    return rej(new ApiError('Subcategory not found', StatusCodes.NOT_FOUND))
                }
                const response = new InvoicePersistor().getByOrderId(orderId);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async invoiceByUserId(userId: string): Promise<Invoice[]> {
        return new Promise(async (res, rej) => {
            try {
                const order = new SubCategoryManagement().getById(userId);
                if (!order) {
                    return rej(new ApiError('Subcategory not found', StatusCodes.NOT_FOUND))
                }
                const response = new InvoicePersistor().getByUserId(userId);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async createInvoice(payload: Invoice): Promise<Invoice> {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const response = new InvoicePersistor().create(payload)
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    validatorBody(address: Invoice) {
        const missingAttributes = []
        if (!address.order) {
            missingAttributes.push("price")
        }
        if (!address.user) {
            missingAttributes.push("description")
        }
        return missingAttributes
    }

}

