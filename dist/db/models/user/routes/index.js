"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../business");
const entitys_1 = require("../../common/entitys");
const errorHandler_1 = require("../../common/errorHandler");
const auth_1 = require("../../../utils/auth");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.get('/', auth_1.verifyToken, async (req, res) => {
    try {
        const manage = new business_1.UserManagement();
        res.send(new entitys_1.SuccessResponse(await manage.users(), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
exports.userRoute.post('/login', async (req, res) => {
    try {
        const manage = new business_1.UserManagement();
        const body = req.body;
        res.send(new entitys_1.SuccessResponse(await manage.loginExistingUser(body)));
    }
    catch (err) {
        return (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.userRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const manage = new business_1.UserManagement();
        res.send(new entitys_1.SuccessResponse(await manage.user(id), 'Retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
exports.userRoute.post('/', async (req, res) => {
    try {
        const body = req.body;
        const manage = new business_1.UserManagement();
        res.send(new entitys_1.SuccessResponse(await manage.createUser(body), 'Created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.userRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoryManagement = new business_1.UserManagement();
        res.send(new entitys_1.SuccessResponse(await categoryManagement.deleteUser(id), 'Deleted successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
//# sourceMappingURL=index.js.map