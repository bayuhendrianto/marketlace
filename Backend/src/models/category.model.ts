import { DataTypes, Sequelize } from "sequelize";
import { db } from "../config/db";

const ProductCategoryModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  createdUser: {
    type: DataTypes.STRING,
  },
  createdDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("now"),
  },
  updatedUser: {
    type: DataTypes.STRING,
  },
  updatedDate: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
};

const ProductCategories = db.define(
  "product_categories",
  ProductCategoryModel,
  {
    freezeTableName: true,
    paranoid: true,
  }
);

db.sync()
  .then(() => {})
  .catch((error) => {});

export { ProductCategories };
