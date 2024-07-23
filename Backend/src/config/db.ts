import { Sequelize } from "sequelize";

const db = new Sequelize("marketplace", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

export { db };
