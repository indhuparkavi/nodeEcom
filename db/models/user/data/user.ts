import { UUID } from "node:crypto";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, NonAttribute } from "sequelize";
import Role from "../../role/data/role";
import ProfileModel from "../../profile/data";
import { sequelize } from '../../../connection';
import { AddressModel } from "../../address/data";

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    declare id: CreationOptional<string>;
    declare roleId: string;
    declare role: NonAttribute<Role>
    declare active: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    deletedAt: DataTypes.DATE,
}, {
    tableName: 'users',
    sequelize,
    paranoid: true
})

export default UserModel;

UserModel.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(UserModel, { foreignKey: 'roleId' });

UserModel.hasOne(ProfileModel, { foreignKey: 'userId' });
ProfileModel.belongsTo(UserModel, { foreignKey: 'userId' });

UserModel.hasMany(AddressModel, { foreignKey: 'userId' });
AddressModel.belongsTo(UserModel, { foreignKey: 'userId' });
