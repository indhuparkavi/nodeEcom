import { Order } from "../../order/entity";
import { User } from "../../user/entity";

export class Invoice {
    id?: string;
    invoiceNo: string;
    order: Order;
    user: User;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(invoiceNo: string, order: Order, user: User) {
        this.invoiceNo = invoiceNo;
        this.order = order;
        this.user = user;
    }
}