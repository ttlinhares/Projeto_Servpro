import { Sequelize } from "sequelize";
import db from "../db/db.js";

export default db.define("servicos",{
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
    cpf:{
        type: Sequelize.STRING(11),
        allowNull: true
    },
    cnpj:{
        type: Sequelize.STRING(14),
        allowNull: true
    },
    telefone:{
        type: Sequelize.STRING(11),
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING(80),
        allowNull: false
    },
    descricao_servico:{
        type: Sequelize.STRING(80),
        allowNull: false
    },
    dataehora:{
        type: Sequelize.DATE,
        allowNull: false
    },
})
