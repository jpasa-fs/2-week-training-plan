import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const database = process.env.DB_NAME ?? "test_db";
const username = process.env.DB_USER ?? "root";
const password = process.env.DB_PASSWORD ?? "";
const host = process.env.DB_HOST ?? "";

export const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});
