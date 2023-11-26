import session from "express-session";
import servicosModel from "../models/servicosModel.js";
import usuarioModel from "../models/usuarioModel.js";


// RETORNA PÁGINA DE NOVO USUÁRIO
async function novousuario(request, response) {
    response.render("cadastrousuario", { message: '' });
}
// RETORNA PÁGINA DE EDITAR USUÁRIO
async function editarusuario(request, response) {
    const userID = request.session.userID;
    try {
        const usuario = await usuarioModel.findOne({
            where: {
                id: userID,
            }
        });

        if (usuario) {
            response.render("editarusuario", { usuario: usuario, message: '' });
        } else {
            response.render("cadastrousuario", { message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        response.status(500).send("Erro interno do servidor");
    }
}

// RETORNA PÁGINA DE LOGIN
async function login(request, response) {
    response.render("login", { message: '' });
}
// RETORNA PÁGINA DE CADASTRAR SERVIÇO
async function cadastrarservico(request, response) {
    response.render("cadastroServico");
}
// EXCLUIR SERVIÇO
async function excluirservico(request, response) {
    const servicoID = request.params.id;
    console.log("o id do serviço é: ",servicoID);
    try {
        const resultado = await servicosModel.servicosModel.destroy({
            where: {
                id: servicoID,
                idUsuario: request.session.userID
            }
        });

        if (resultado > 0) {
            home(request,response, request.session.userNAME,request.session.userID)
        } else {
            response.status(404).send("Serviço não encontrado ou você não tem permissão para excluí-lo.");
        }
    } catch (error) {
        console.error("Erro ao excluir serviço:", error);
        response.status(500).send("Erro interno do servidor");
    }
}

// FUNÇÃO LOGON
async function logon(request, response) {
    const { email, senha } = request.body;

    try {

        const usuario = await usuarioModel.findOne({
            where: {
                email: email,
                senha: senha
            }
        });

        if (!usuario || usuario.get("senha") !== senha) {
            response.render("login", { message: 'Usuário ou senha inválidos!' });
        } else {

            //const userNAME = usuario.get("nome");
            //const userID = usuario.get("id");
            request.session.userID = usuario.get("id");
            request.session.userName = usuario.get("nome");

            console.log("O nome do usuário é: "+ request.session.userName +" e o ID é: "+ request.session.userID);
            home(request,response, request.session.userName, request.session.userID);

            //response.render("home", {userNAME, userID});
        };

    } catch (error) {
        console.log("Erro ao realizar login", error);
        response.status(500).render("login", { message: "Erro interno do servidor." })
    }
}
// FUNÇÃO CADASTRAR NOVO USUÁRIO
async function cadastrousuario(request, response) {
    const nome = request.body.nome;
    const senha = request.body.senha;
    const email = request.body.email;

    await usuarioModel.create({ nome, email, senha });

    response.render("login", { message: 'Cadastro efetuado com sucesso!' });

}
// FUNÇÃO EDITAR USUÁRIO
async function salvarusuario(request, response) {
    const userID = request.session.userID;
    const { nome, senha, email } = request.body;

    try {
        const resultado = await usuarioModel.update(
            { nome, senha, email },
            { where: { id: userID } }
        );

        if (resultado[0] > 0) {
            home(request,response, request.session.userName, request.session.userID);
        } else {
            response.render("cadastrousuario", { message: 'Nenhum cadastro foi atualizado.' });
        }
    } catch (error) {
        response.render("cadastrousuario", { message: `Erro ao atualizar cadastro: ${error.message}` });
    }
}


//FUNÇÃO CADASTRAR SERVIÇO
async function cadserv(request, response) {
    const { nome, cpf, cnpj, telefone, endereco, descricao_servico, dataehora } = request.body;

    await servicosModel.servicosModel.create({ nome, cpf, cnpj, telefone, endereco, descricao_servico, dataehora, idUsuario: request.session.userID });

    home(request,response, request.session.userName, request.session.userID);

}
//FUNÇÃO EDITAR SERVIÇO
async function editarservico(request, response) {
    const servID = request.params.id;

    console.log("O ID DO SERVIÇO É:", servID);

    const servico = await servicosModel.servicosModel.findOne({
        where:{
            id: servID,
            idUsuario: request.session.userID
        }
    });

    response.render("editarservico",{servico});
}
//FUNÇÃO UPDATE SERVIÇO
async function updateservico(request, response) {
    const servID = request.params.id;
    const { nome, cpf, cnpj, telefone, endereco, descricao_servico, dataehora } = request.body;

    console.log("O ID DO SERVIÇO É:", servID);

    try {
        const resultado = await servicosModel.servicosModel.update(
            { nome, cpf, cnpj, telefone, endereco, descricao_servico, dataehora },
            {
                where: {
                    id: servID,
                    idUsuario: request.session.userID
                }
            }
        );

        if (resultado[0] > 0) {
            console.log('Serviço atualizado com sucesso.');
        } else {
            console.log('Nenhum serviço foi atualizado.');
        }

        home(request, response, request.session.userName, request.session.userID);
    } catch (error) {
        console.error('Ocorreu um erro ao atualizar o serviço:', error);
        response.status(500).send('Erro ao atualizar o serviço');
    }
}

//FUNÇÃO LOGOUT
async function logout(request, response) {
    request.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
        }
        // Redirecionar para a página de login ou outra página
        response.redirect('/login');
    });


}

// HOME
async function home(request, response, userNAME, userID) {

    const servicos = await servicosModel.servicosModel.findAll({
        where: {
            idUsuario: userID,
        }
    });

    const dataDeHoje = new Date().toLocaleDateString();
    response.render("home", { servicos, userNAME, dataDeHoje, userID});

}


export default { home,
     novousuario,
     cadastrousuario,
     login,
     logon,
     cadserv,
     cadastrarservico,
     logout,
     editarservico,
     salvarusuario,
     editarusuario,
     excluirservico,
     updateservico
}
