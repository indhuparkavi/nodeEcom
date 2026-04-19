"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
const user_1 = __importDefault(require("../../user/data/user"));
const data_1 = __importDefault(require("../../delivery/data"));
const data_2 = __importDefault(require("../../invoice/data"));
class OrderModel extends sequelize_1.Model {
}
OrderModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    code: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sellingPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orderedDate: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    tableName: 'orders',
    timestamps: false,
    sequelize: connection_1.sequelize
});
exports.default = OrderModel;
OrderModel.belongsTo(user_1.default, { foreignKey: 'userId' });
user_1.default.hasMany(OrderModel, { foreignKey: 'userId' });
OrderModel.hasMany(data_2.default, { foreignKey: 'orderId' });
data_2.default.belongsTo(OrderModel, { foreignKey: 'orderId' });
OrderModel.hasMany(data_1.default, { foreignKey: 'orderId' });
data_1.default.belongsTo(OrderModel, { foreignKey: 'orderId' });
//# sourceMappingURL=index.js.map