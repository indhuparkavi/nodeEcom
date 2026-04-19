import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from '../../../connection';
import { Order } from "../../order/entity";

class DeliveryModel extends Model<InferAttributes<DeliveryModel>, InferCreationAttributes<DeliveryModel>> {
    declare id: CreationOptional<string>;
    declare estimatedDate: Date;
    declare deliveriedDate: Date;
    declare status: string;
    declare orderId: string;
    declare order: NonAttribute<Order>;
    declare trackingId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

DeliveryModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    estimatedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deliveriedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    trackingId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    tableName: 'deliveries',
    sequelize
});

export default DeliveryModel