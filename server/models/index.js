import { Sequelize } from "sequelize";
import Users from "./Users.js";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "khu";
const DB_USER = process.env.DB_USER || "khukhukhu";
const DB_PASSWORD = process.env.DB_PASSWORD || "khukhukhukhukhukhu";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

Users(sequelize, Sequelize.DataTypes).sync();

export default sequelize;
