"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const errorHandler_1 = require("../common/errorHandler");
const services_1 = require("./services");
const entitys_1 = require("../common/entitys");
const http_status_codes_1 = require("http-status-codes");
exports.categoryRoute = (0, express_1.Router)();
exports.categoryRoute.get('/', async (req, res) => {
    try {
        const categoryManagement = new services_1.CategoryManagement();
        res.send(new entitys_1.SuccessResponse(await categoryManagement.categories(), 'Categories retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
exports.categoryRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoryManagement = new services_1.CategoryManagement();
        res.send(new entitys_1.SuccessResponse(await categoryManagement.categoryById(id), 'Category retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
exports.categoryRoute.post('/', async (req, res) => {
    try {
        const category = req.body;
        const categoryManagement = new services_1.CategoryManagement();
        res.send(new entitys_1.SuccessResponse(await categoryManagement.createCategory(transform(category)), 'Category created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
exports.categoryRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const categoryManagement = new services_1.CategoryManagement();
        res.send(new entitys_1.SuccessResponse(await categoryManagement.updateCategory(id, transform(body)), 'Category updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
exports.categoryRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoryManagement = new services_1.CategoryManagement();
        res.send(new entitys_1.SuccessResponse(await categoryManagement.deleteCategory(id), 'Category deleted successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, req);
    }
});
// const transformBulk = (data: any) => {
//     return data.map((category: any) => transform(category))
// }
const transform = (data) => {
    let category = {};
    if (data.id) {
        category.id = data.id;
    }
    if (data.name) {
        category.name = data.name;
    }
    return category;
};
//# sourceMappingURL=routes.js.map