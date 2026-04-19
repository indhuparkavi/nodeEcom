import { User } from "../../user/entity";

export class Order {
    id?: string;
    code?: string;
    user: User;
    quantity: number;
    status: string;
    sellingPrice: number;
    orderedDate: Date;
    updatedAt?: Date;
    constructor(code: string, quantity: number, sellingPrice: number, status: string, orderedDate: Date, user: User) {
        this.code = code;
        this.quantity = quantity;
        this.sellingPrice = sellingPrice;
        this.orderedDate = orderedDate;
        this.status = status;
        this.user = user;
    }
}