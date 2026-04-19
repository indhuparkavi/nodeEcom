"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../business");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
exports.productRoute = (0, express_1.Router)();
exports.productRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.ProductManagement();
        res.send(new entitys_1.SuccessResponse(await manage.productById(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.productRoute.get('/', async (req, res) => {
    try {
        const manage = new business_1.ProductManagement();
        res.send(new entitys_1.SuccessResponse(await manage.products(), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.productRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.ProductManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createProduct(body), 'Created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.productRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const manage = new business_1.ProductManagement();
        res.send(new entitys_1.SuccessResponse(await manage.updateProduct(id, body), 'Updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.productRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.ProductManagement();
        res.send(new entitys_1.SuccessResponse(await manage.deleteProduct(id), 'Deleted successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=index.js.map