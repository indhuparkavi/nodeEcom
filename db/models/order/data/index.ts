import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from '../../../connection';
import UserModel from "../../user/data/user";
import Delivery from "../../delivery/data";
import { User } from "../../user/entity";
import InvoiceModel from "../../invoice/data";

class OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
    declare id: CreationOptional<string>;
    declare code: string;
    declare userId: string;
    declare user: NonAttribute<User>;
    declare quantity: number;
    declare status: string;
    declare sellingPrice: number;
    declare orderedDate: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

OrderModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    code: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sellingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderedDate: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'orders',
    timestamps: false,
    sequelize
});

export default OrderModel;

OrderModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasMany(OrderModel, { foreignKey: 'userId' });

OrderModel.hasMany(InvoiceModel, { foreignKey: 'orderId' });
InvoiceModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

OrderModel.hasMany(Delivery, { foreignKey: 'orderId' });
Delivery.belongsTo(OrderModel, { foreignKey: 'orderId' });