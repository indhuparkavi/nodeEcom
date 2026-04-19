"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../business");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
exports.profileRoute = (0, express_1.Router)();
exports.profileRoute.get('/user/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const manage = new business_1.ProfileManagement();
        res.send(new entitys_1.SuccessResponse(await manage.profileByUserId(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.profileRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.ProfileManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createProfile(body), 'Created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.profileRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const manage = new business_1.ProfileManagement();
        res.send(new entitys_1.SuccessResponse(await manage.updateProfile(id, body), 'Updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=index.js.map