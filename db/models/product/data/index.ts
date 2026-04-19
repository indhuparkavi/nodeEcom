import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from '../../../connection';
import Order from "../../order/data";
import { SubCategory } from "../../subCategory/entity";
import SubCategoryModel from "../../subCategory/data/subCategory";

class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare price: number;
    declare description: string;
    declare type: CreationOptional<string>;
    declare color: CreationOptional<string>;
    declare image: string;
    declare stock: string;
    declare subCategoryId: string;
    declare subCategory: NonAttribute<SubCategory>
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ProductModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    subCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
    },
    color: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'products',
    sequelize
});

export default ProductModel;

ProductModel.belongsTo(SubCategoryModel, { foreignKey: 'subCategoryId' });
SubCategoryModel.hasMany(ProductModel, { foreignKey: 'subCategoryId' });

ProductModel.belongsToMany(Order, { through: 'ProductOrder' });
Order.belongsToMany(ProductModel, { through: 'ProductOrder' });
