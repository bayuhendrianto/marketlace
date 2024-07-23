import { DataTypes, Sequelize } from "sequelize";
import { db } from "../config/db";

const UserModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(50),
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
  firstName: {
    type: DataTypes.STRING(50),
  },
  lastName: {
    type: DataTypes.STRING(50),
  },
  roleId: {
    type: DataTypes.UUID,
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

const Users = db.define("users", UserModel, {
  freezeTableName: true,
  paranoid: true,
});

db.sync()
  .then(() => {})
  .catch((error) => {});

export { Users };
