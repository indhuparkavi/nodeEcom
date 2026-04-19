"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
const data_1 = __importDefault(require("../../invoice/data"));
class PaymentModel extends sequelize_1.Model {
}
PaymentModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    invoiceId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    tableName: 'payments',
    sequelize: connection_1.sequelize
});
exports.default = PaymentModel;
PaymentModel.belongsTo(data_1.default, { foreignKey: 'invoiceId' });
data_1.default.hasMany(PaymentModel, { foreignKey: 'invoiceId' });
//# sourceMappingURL=index.js.map