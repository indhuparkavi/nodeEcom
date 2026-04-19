"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRoute = void 0;
const express_1 = require("express");
const entitys_1 = require("../common/entitys");
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../common/errorHandler");
exports.roleRoute = (0, express_1.Router)();
exports.roleRoute.get('/', async (req, res) => {
    try {
        let roleManangement = new services_1.RoleManangement();
        res.send(new entitys_1.SuccessResponse(await roleManangement.roles(), 'Roles retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.roleRoute.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let roleManangement = new services_1.RoleManangement();
        res.send(new entitys_1.SuccessResponse(await roleManangement.roleById(id), 'Role retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
//# sourceMappingURL=router.js.map