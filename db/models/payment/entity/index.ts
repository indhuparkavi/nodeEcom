import { Invoice } from "../../invoice/entity";

export class Payment {
    id?: string;
    status: string;
    invoice: Invoice;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(status: string, invoice: Invoice) {
        this.status = status;
        this.invoice = invoice;
    }
}