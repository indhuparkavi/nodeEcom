import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from '../../../connection';
import Category from "../../category/data/category";

class SubCategoryModel extends Model<InferAttributes<SubCategoryModel>, InferCreationAttributes<SubCategoryModel>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare categoryId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

SubCategoryModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'subCategories',
    sequelize
});

export default SubCategoryModel;

SubCategoryModel.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(SubCategoryModel, { foreignKey: 'categoryId' });