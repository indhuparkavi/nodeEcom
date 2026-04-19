"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
const category_1 = __importDefault(require("../../category/data/category"));
class SubCategoryModel extends sequelize_1.Model {
}
SubCategoryModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    categoryId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'subCategories',
    sequelize: connection_1.sequelize
});
exports.default = SubCategoryModel;
SubCategoryModel.belongsTo(category_1.default, { foreignKey: 'categoryId' });
category_1.default.hasMany(SubCategoryModel, { foreignKey: 'categoryId' });
//# sourceMappingURL=subCategory.js.map