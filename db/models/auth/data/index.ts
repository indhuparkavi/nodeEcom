import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, UUIDV4 } from "sequelize";
import { sequelize } from '../../../connection';

export class AuthModel extends Model<InferAttributes<AuthModel>, InferCreationAttributes<AuthModel>> {
    declare id: CreationOptional<string>;
    declare email: CreationOptional<string>;
    declare contact: CreationOptional<string>;
    declare userId: string;
    declare password: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

AuthModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    contact: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    tableName: 'auth',
    sequelize
})