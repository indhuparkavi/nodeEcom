import { Order } from "../../order/entity";

export class Delivery {
    id?: string;
    estimatedDate: Date;
    deliveriedDate: Date;
    status: string;
    order: Order;
    trackingId: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(estimatedDate: Date, deliveriedDate: Date, status: string, order: Order, trackingId: string) {
        this.estimatedDate = estimatedDate;
        this.deliveriedDate = deliveriedDate;
        this.order = order;
        this.status = status;
        this.trackingId = trackingId;
    }
}