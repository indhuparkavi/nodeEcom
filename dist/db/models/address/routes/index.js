"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../business");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
exports.addressRoute = (0, express_1.Router)();
// addressRoute.get('/',
//     async (req, res) => {
//         try {
//             const manage = new AddressManagement();
//             res.send(new SuccessResponse(await manage.addresses(), 'Retrived successfully', StatusCodes.OK))
//         } catch (err) {
//             errorHandler(err, req)
//         }
//     }
// )
exports.addressRoute.get('/user/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const manage = new business_1.AddressManagement();
        res.send(new entitys_1.SuccessResponse(await manage.addressByUserId(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.addressRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.AddressManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createAddress(body), 'Category created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.addressRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const manage = new business_1.AddressManagement();
        res.send(new entitys_1.SuccessResponse(await manage.updateAddress(id, body), 'Updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.addressRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.AddressManagement();
        res.send(new entitys_1.SuccessResponse(await manage.deleteAddress(id), 'Category deleted successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=index.js.map