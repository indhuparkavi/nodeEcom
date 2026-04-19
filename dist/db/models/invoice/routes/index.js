"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
const business_1 = require("../business");
exports.invoiceRoute = (0, express_1.Router)();
exports.invoiceRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.InvoiceManagement();
        res.send(new entitys_1.SuccessResponse(await manage.InvoiceById(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.invoiceRoute.get('/user/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const manage = new business_1.InvoiceManagement();
        res.send(new entitys_1.SuccessResponse(await manage.invoiceByUserId(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.invoiceRoute.get('/user/:orderId', async (req, res) => {
    try {
        const id = req.params.orderId;
        const manage = new business_1.InvoiceManagement();
        res.send(new entitys_1.SuccessResponse(await manage.invoiceByUserId(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.invoiceRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.InvoiceManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createInvoice(body), 'Created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=index.js.map