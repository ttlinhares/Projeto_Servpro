import { Sequelize } from "sequelize";

const dbName = "servpro";
const dbUser = "root";
const dbPassword = "";

const dbHost = "localhost";
const dbPort = "3306";

const db = new Sequelize(dbName,dbUser,dbPassword,{
    host: dbHost,
    port: dbPort,
    dialect: "mysql"
});

export default db;
