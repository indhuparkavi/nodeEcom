"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
class AddressModel extends sequelize_1.Model {
}
exports.AddressModel = AddressModel;
AddressModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    addressType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'addresses',
    sequelize: connection_1.sequelize
});
//# sourceMappingURL=index.js.map