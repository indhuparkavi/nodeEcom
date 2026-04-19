"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../business");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
exports.deliveryRoute = (0, express_1.Router)();
exports.deliveryRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.DeliveryManagement();
        res.send(new entitys_1.SuccessResponse(await manage.deliveryById(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.deliveryRoute.get('/order/:orderId', async (req, res) => {
    try {
        const id = req.params.orderId;
        const manage = new business_1.DeliveryManagement();
        res.send(new entitys_1.SuccessResponse(await manage.deliveryByOrderId(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.deliveryRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.DeliveryManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createDelivery(body), 'Created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.deliveryRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const manage = new business_1.DeliveryManagement();
        res.send(new entitys_1.SuccessResponse(await manage.updateDelivery(id, body), 'Updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=index.js.map