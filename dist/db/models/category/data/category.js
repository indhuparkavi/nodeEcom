"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
class CategoryModel extends sequelize_1.Model {
}
CategoryModel.init({
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
}, {
    tableName: 'categories',
    sequelize: connection_1.sequelize
});
exports.default = CategoryModel;
//# sourceMappingURL=category.js.map