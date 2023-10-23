import servicosModel from "../models/servicosModel.js";
import usuarioModel from "../models/usuarioModel.js";

async function home(request, response) {
    const servicos = await servicosModel.findAll();
    const nomeDoCliente = 'Cliente Exemplo';
    const dataDeHoje = new Date().toLocaleDateString();

    response.render("home", { servicos, nomeDoCliente, dataDeHoje});

}

async function novousuario(request, response) {
    response.render("cadastrousuario", { message: '' });
}

async function login(request, response) {
    response.render("login", { message: '' });
}

async function logon(request, response) {
    const emailuser = request.body.email;
    const senhauser = request.body.senha;

    const usuario =  await usuarioModel.findOne({
        where:{
            email: emailuser,
            senha: senhauser
        }
    });


    if (!usuario){
        response.render("login", { message: 'Usuário ou senha inválidos!' });
    };
    if(usuario){
        home(request,response);

    };


}

async function cadastrousuario(request, response) {
    const nome = request.body.nome;
    const senha = request.body.senha;
    const email = request.body.email;

    await usuarioModel.create({ nome, email, senha });

    response.render("cadastrousuario", { message: 'Cadastro efetuado com sucesso!' });

}
async function cadserv(request, response) {
    const { nome, cpf, cnpj, telefone, endereco, descricao_servico, dataehora } = request.body;

    await servicosModel.create({ nome, cpf, cnpj, telefone, endereco, descricao_servico, dataehora });

    response.render('login');

}



export default { home, novousuario, cadastrousuario, login, logon, cadserv }
