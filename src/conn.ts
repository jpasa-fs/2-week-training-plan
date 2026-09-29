import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("test_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
