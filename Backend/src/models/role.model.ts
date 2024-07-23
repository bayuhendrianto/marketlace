import { DataTypes } from "sequelize";
import { db } from "../config/db";

const RoleModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    validate: {
      isEmail: true,
    },
  },
  description: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
  permissions: {
    type: DataTypes.TEXT,
  },
};

const Roles = db.define("roles", RoleModel, {
  freezeTableName: true,
  paranoid: true,
});

db.sync()
  .then(() => {})
  .catch((error) => {});

export { Roles };
