import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from '../../../connection';
import { User } from "../../user/entity";
import UserModel from "../../user/data/user";
import { Order } from "../../order/entity";

class InvoiceModel extends Model<InferAttributes<InvoiceModel>, InferCreationAttributes<InvoiceModel>> {
    declare id: CreationOptional<string>;
    declare invoiceNo: string;
    declare orderId: string;
    declare userId: string;
    declare order: NonAttribute<Order>;
    declare user: NonAttribute<User>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

InvoiceModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    invoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    createdAt: DataTypes.DATE,

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'invoices',
    sequelize
});

export default InvoiceModel;

UserModel.hasMany(InvoiceModel, { foreignKey: 'userId' });
InvoiceModel.belongsTo(UserModel, { foreignKey: 'userId' });
