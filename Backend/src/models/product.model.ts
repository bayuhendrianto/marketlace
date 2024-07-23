import { DataTypes, Sequelize } from "sequelize";
import { db } from "../config/db";

const ProductModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  plu: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  productCategoryId: {
    type: DataTypes.UUID,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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

const ProductVariantModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
  },
  code: {
    type: DataTypes.STRING,
  },
  imageLocation: {
    type: DataTypes.STRING,
  },
  qty: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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

const Products = db.define("products", ProductModel, {
  freezeTableName: true,
  paranoid: true,
});

const ProductVarians = db.define("product_varians", ProductVariantModel, {
  freezeTableName: true,
  paranoid: true,
});

db.sync()
  .then(() => {})
  .catch((error) => {});

export { Products, ProductVarians };
