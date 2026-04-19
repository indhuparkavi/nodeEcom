"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../business");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
exports.orderRoute = (0, express_1.Router)();
exports.orderRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.OrderManagement();
        res.send(new entitys_1.SuccessResponse(await manage.orderById(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.orderRoute.get('/user/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const manage = new business_1.OrderManagement();
        res.send(new entitys_1.SuccessResponse(await manage.ordersForUser(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.orderRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.OrderManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createOrder(body), 'Created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        console.log("1", err);
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.orderRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const manage = new business_1.OrderManagement();
        res.send(new entitys_1.SuccessResponse(await manage.updateOrder(id, body), 'Updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=index.js.map