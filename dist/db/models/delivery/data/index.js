"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
class DeliveryModel extends sequelize_1.Model {
}
DeliveryModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    estimatedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    deliveriedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    trackingId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    tableName: 'deliveries',
    sequelize: connection_1.sequelize
});
exports.default = DeliveryModel;
//# sourceMappingURL=index.js.map