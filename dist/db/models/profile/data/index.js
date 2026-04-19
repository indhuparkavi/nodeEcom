"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
class ProfileModel extends sequelize_1.Model {
}
exports.ProfileModel = ProfileModel;
ProfileModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        allowNull: false,
        type: sequelize_1.DataTypes.UUID
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
    },
    gst: {
        type: sequelize_1.DataTypes.STRING,
    },
    pan: {
        type: sequelize_1.DataTypes.STRING,
    },
    businessType: {
        type: sequelize_1.DataTypes.STRING,
    },
    dob: {
        type: sequelize_1.DataTypes.DATE
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    tableName: 'profiles',
    sequelize: connection_1.sequelize,
});
exports.default = ProfileModel;
//# sourceMappingURL=index.js.map