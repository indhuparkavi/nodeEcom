import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from '../../../connection';
import InvoiceModel from "../../invoice/data";
import { Invoice } from "../../invoice/entity";

class PaymentModel extends Model<InferAttributes<PaymentModel>, InferCreationAttributes<PaymentModel>> {
    declare id: CreationOptional<string>;
    declare status: string;
    declare invoiceId: string;
    declare invoice: NonAttribute<Invoice>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

PaymentModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoiceId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    tableName: 'payments',
    sequelize
});

export default PaymentModel;

PaymentModel.belongsTo(InvoiceModel, { foreignKey: 'invoiceId' });
InvoiceModel.hasMany(PaymentModel, { foreignKey: 'invoiceId' })