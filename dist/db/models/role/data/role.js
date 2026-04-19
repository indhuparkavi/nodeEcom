"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../connection");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
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
    deletedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'roles',
    sequelize: connection_1.sequelize,
    paranoid: true
});
exports.default = Role;
//# sourceMappingURL=role.js.map