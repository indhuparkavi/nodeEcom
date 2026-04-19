"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(code, quantity, sellingPrice, status, orderedDate, user) {
        this.code = code;
        this.quantity = quantity;
        this.sellingPrice = sellingPrice;
        this.orderedDate = orderedDate;
        this.status = status;
        this.user = user;
    }
}
exports.Order = Order;
//# sourceMappingURL=index.js.map