"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRoute = void 0;
const express_1 = require("express");
const services_1 = require("./services");
const entitys_1 = require("../common/entitys");
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../common/errorHandler");
exports.subCategoryRoute = (0, express_1.Router)();
exports.subCategoryRoute.get('/', async (req, res) => {
    try {
        const subCategoryManagement = new services_1.SubCategoryManagement();
        res.send(new entitys_1.SuccessResponse(await subCategoryManagement.getAll(), 'SubCategory retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.subCategoryRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subCategoryManagement = new services_1.SubCategoryManagement();
        res.send(new entitys_1.SuccessResponse(await subCategoryManagement.getById(id), 'Category retrived successfully', http_status_codes_1.StatusCodes.OK));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.subCategoryRoute.post('/', async (req, res) => {
    try {
        const category = req.body;
        console.log(category);
        const subCategoryManagement = new services_1.SubCategoryManagement();
        res.send(new entitys_1.SuccessResponse(await subCategoryManagement.create(transform(category)), 'Category created successfully', http_status_codes_1.StatusCodes.CREATED));
    }
    catch (err) {
        console.log(err, 'err');
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.subCategoryRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const subCategoryManagement = new services_1.SubCategoryManagement();
        res.send(new entitys_1.SuccessResponse(await subCategoryManagement.update(id, transform(body)), 'Category updated successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
exports.subCategoryRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subCategoryManagement = new services_1.SubCategoryManagement();
        res.send(new entitys_1.SuccessResponse(await subCategoryManagement.delete(id), 'Category deleted successfully', http_status_codes_1.StatusCodes.ACCEPTED));
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(err, res);
    }
});
const transform = (data) => {
    let subCategory = {};
    if (data.id) {
        subCategory.id = data.id;
    }
    if (data.name) {
        subCategory.name = data.name;
    }
    if (data.categoryId) {
        subCategory.categoryId = data.categoryId;
    }
    return subCategory;
};
//# sourceMappingURL=routes.js.map