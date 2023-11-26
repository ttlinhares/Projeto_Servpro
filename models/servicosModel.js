import { Sequelize } from "sequelize";
import db from "../db/db.js";
import usuarioModel from "./usuarioModel.js";

const servicosModel = db.define("servicos",{
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

servicosModel.belongsTo(usuarioModel, {
    constraints: true,
    foreignKey: "idUsuario"
})

export default {servicosModel};

