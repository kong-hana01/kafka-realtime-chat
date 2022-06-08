import { Sequelize } from "sequelize";
import Rooms from "./Rooms.js";
import Users from "./Users.js";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "khu";
const DB_USER = process.env.DB_USER || "khukhukhu";
const DB_PASSWORD = process.env.DB_PASSWORD || "khukhukhukhukhukhu";

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

db.Users = Users(db, Sequelize.DataTypes);
db.Rooms = Rooms(db, Sequelize.DataTypes);

export default db;
