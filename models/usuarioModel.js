import { Sequelize } from "sequelize";
import db from "../db/db.js";

export default db.define("usuarios",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING(80),
        allowNull: false
    }
})
