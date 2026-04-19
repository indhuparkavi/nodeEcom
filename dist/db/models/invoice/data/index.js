"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
const user_1 = __importDefault(require("../../user/data/user"));
class InvoiceModel extends sequelize_1.Model {
}
InvoiceModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    invoiceNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    tableName: 'invoices',
    sequelize: connection_1.sequelize
});
exports.default = InvoiceModel;
user_1.default.hasMany(InvoiceModel, { foreignKey: 'userId' });
InvoiceModel.belongsTo(user_1.default, { foreignKey: 'userId' });
//# sourceMappingURL=index.js.map