import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, UUIDV4 } from "sequelize";
import { sequelize } from '../../../connection';

export class ProfileModel extends Model<InferAttributes<ProfileModel>, InferCreationAttributes<ProfileModel>> {
    declare id: CreationOptional<string>;
    declare userId: string;
    declare name: CreationOptional<string>;;
    declare contact: CreationOptional<string>;
    declare email: CreationOptional<string>;
    declare gender: CreationOptional<string>;
    declare dob: CreationOptional<Date>;
    declare gst: CreationOptional<string>;
    declare businessType: CreationOptional<string>;
    declare pan: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ProfileModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    contact: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    gst: {
        type: DataTypes.STRING,
    },
    pan: {
        type: DataTypes.STRING,
    },
    businessType: {
        type: DataTypes.STRING,
    },
    dob: {
        type: DataTypes.DATE
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    tableName: 'profiles',
    sequelize,
})

export default ProfileModel;