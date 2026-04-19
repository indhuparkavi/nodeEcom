import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { Delivery } from "../entity";
import { DeliveryPersistor } from "../data/persistor";
import { SubCategoryManagement } from "../../subCategory/services";


export class DeliveryManagement {

    async deliveryById(id: string): Promise<Delivery> {
        return new Promise(async (res, rej) => {
            try {
                const response = new DeliveryPersistor().getById(id);
                if (!response) {
                    return rej(new ApiError("Delivery not found", StatusCodes.NOT_FOUND))
                }
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
    async deliveryByOrderId(orderId: string): Promise<Delivery[]> {
        return new Promise(async (res, rej) => {
            try {
                const order = new SubCategoryManagement().getById(orderId);
                if (!order) {
                    return rej(new ApiError('Order not found', StatusCodes.NOT_FOUND))
                }
                const response = new DeliveryPersistor().getByOrderId(orderId);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async createDelivery(payload: Delivery): Promise<Delivery> {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const response = new DeliveryPersistor().create(payload)
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async updateDelivery(id: string, payload: Delivery): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const response = new DeliveryPersistor().update(id, payload);
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    validatorBody(address: Delivery) {
        const missingAttributes = []
        if (!address.estimatedDate) {
            missingAttributes.push("estimatedDate")
        }
        if (!address.deliveriedDate) {
            missingAttributes.push("deliveriedDate")
        }
        if (!address.status) {
            missingAttributes.push("status")
        }
        if (!address.trackingId) {
            missingAttributes.push("trackingId")
        }
        if (!address.order?.id) {
            missingAttributes.push("order id")
        }
        return missingAttributes
    }

}

