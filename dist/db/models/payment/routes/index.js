"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../business");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
exports.paymentRoute = (0, express_1.Router)();
exports.paymentRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.PaymentManagement();
        res.send(new entitys_1.SuccessResponse(await manage.paymentById(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.paymentRoute.get('/invoice/:invoiceId', async (req, res) => {
    try {
        const id = req.params.invoiceId;
        const manage = new business_1.PaymentManagement();
        res.send(new entitys_1.SuccessResponse(await manage.paymentByInvoiceId(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.paymentRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.PaymentManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createPayment(body), 'Created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.paymentRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const manage = new business_1.PaymentManagement();
        res.send(new entitys_1.SuccessResponse(await manage.updatePayment(id, body), 'Updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=index.js.map