import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, UUIDV4 } from "sequelize";
import { sequelize } from '../../../connection';
import { User } from "../../user/entity";

export class AddressModel extends Model<InferAttributes<AddressModel>, InferCreationAttributes<AddressModel>> {
    declare id: CreationOptional<string>;
    declare addressType: string;
    declare street: string;
    declare city: string;
    declare state: string;
    declare country: string;
    declare zip: string;
    declare userId: string;
    declare user: NonAttribute<User>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

AddressModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    addressType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'addresses',
    sequelize
})