import { DataTypes, Sequelize } from "sequelize";
import { db } from "../config/db";

const TransactionModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  transactionNo: {
    type: DataTypes.STRING,
  },
  totalAmount: {
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

const Details = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  qty: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  subtotal: {
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

const TransactionDetailModel = {
  ...Details,
  transactionId: {
    type: DataTypes.UUID,
  },
  productVarianId: {
    type: DataTypes.UUID,
  },
};

const ShoppingCartDetailModel = {
  ...Details,
  shoppingCartId: {
    type: DataTypes.UUID,
  },
  productVarianId: {
    type: DataTypes.UUID,
  },
};

const Transactions = db.define("transactions", TransactionModel, {
  freezeTableName: true,
  paranoid: true,
});

const TransactionDetails = db.define(
  "transaction_details",
  TransactionDetailModel,
  {
    freezeTableName: true,
    paranoid: true,
  }
);

const ShoppingCart = db.define("shopping-cart", TransactionModel, {
  freezeTableName: true,
  paranoid: true,
});

const ShoppingCartDetails = db.define(
  "shopping-cart",
  ShoppingCartDetailModel,
  {
    freezeTableName: true,
    paranoid: true,
  }
);

db.sync()
  .then(() => {})
  .catch((error) => {});

export { Transactions, TransactionDetails, ShoppingCart, ShoppingCartDetails };
