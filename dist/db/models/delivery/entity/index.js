"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
class Delivery {
    constructor(estimatedDate, deliveriedDate, status, order, trackingId) {
        this.estimatedDate = estimatedDate;
        this.deliveriedDate = deliveriedDate;
        this.order = order;
        this.status = status;
        this.trackingId = trackingId;
    }
}
exports.Delivery = Delivery;
//# sourceMappingURL=index.js.map