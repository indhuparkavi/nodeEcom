"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const role_1 = __importDefault(require("../../role/data/role"));
const data_1 = __importDefault(require("../../profile/data"));
const connection_1 = require("../../../connection");
const data_2 = require("../../address/data");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    contact: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    deletedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'users',
    sequelize: connection_1.sequelize,
    paranoid: true
});
exports.default = UserModel;
UserModel.belongsTo(role_1.default, { foreignKey: 'roleId' });
role_1.default.hasMany(UserModel, { foreignKey: 'roleId' });
UserModel.hasOne(data_1.default, { foreignKey: 'userId' });
data_1.default.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasMany(data_2.AddressModel, { foreignKey: 'userId' });
data_2.AddressModel.belongsTo(UserModel, { foreignKey: 'userId' });
//# sourceMappingURL=user.js.map