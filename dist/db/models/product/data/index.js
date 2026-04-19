"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
const data_1 = __importDefault(require("../../order/data"));
const subCategory_1 = __importDefault(require("../../subCategory/data/subCategory"));
class ProductModel extends sequelize_1.Model {
}
ProductModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    subCategoryId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    tableName: 'products',
    sequelize: connection_1.sequelize
});
exports.default = ProductModel;
ProductModel.belongsTo(subCategory_1.default, { foreignKey: 'subCategoryId' });
subCategory_1.default.hasMany(ProductModel, { foreignKey: 'subCategoryId' });
ProductModel.belongsToMany(data_1.default, { through: 'ProductOrder' });
data_1.default.belongsToMany(ProductModel, { through: 'ProductOrder' });
//# sourceMappingURL=index.js.map