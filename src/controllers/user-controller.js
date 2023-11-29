const CustomError = require('../models/custom-error');
const DB = require('../models/db');
const sha256 = require('sha256');

class UserController extends DB{

    constructor(conn, db_type="mysql"){
        super(conn, db_type);
    }

    login(email, senha){
        let sql = 'SELECT * FROM cliente WHERE email = $1 AND senha = $2';
        let params = [email, sha256(senha)];
        
        return this.query(sql, params).then(result => {
            return (result?.rows||[]);
        })
    }

    register(user){
        
        let nome = user.nome;
        let email = user.email;
        let senha = user.senha;
        let telefone = user.telefone;
        let bairro = user.bairro;
        let cidade = user.cidade;
        let rua = user.rua;
        let numero = user.numero;
        let cep = user.cep;

        if(
            (nome == null || nome.trim() == '') ||
            (email == null || email.trim() == '') ||
            (senha == null || senha.trim() == '') ||
            (telefone == null || telefone.trim() == '')
        )
            throw new CustomError('Verifique os campos obrigatórios!', 400);

        let sql = `
            INSERT INTO cliente (nome, email, senha, telefone, bairro, cidade, rua, numero, cep) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `;
        let params = [
            nome,
            email,
            sha256(senha),
            telefone,
            bairro,
            cidade,
            rua,
            numero,
            cep
        ];

        return this.query(sql, params).then(result => (result != null &&result.rowCount > 0))

    }
    //id_cliente deve estar salvo no historico e a partir dessa info e realizada a busca no BD
    register_pet(pet){
        let id_cliente = pet.id_cliente;
        let nome = pet.nome;
        let tipo = pet.tipo;
        let raca = pet.raca;
        let descricao = pet.descricao;

        if(
            (id_cliente == null || id_cliente.trim() == '')

        )
            throw new CustomError('Verifique os campos obrigatórios!', 400);
        
        let sql = `INSERT INTO pet (nome_raca, nome_pet, fk_id_cliente, descricao, tipo) VALUES ($1, $2, $3, $4, $5)`;

        let params = [
            raca,
            nome,
            id_cliente,
            descricao,
            tipo
        ];

        return this.query(sql, params).then(result => (result != null &&result.rowCount > 0))
    }

    consulta_cliente(){
        console.log('oii')
        const query = `SELECT * FROM cliente`

        return this.query(query).then(result => {
            return (result?.rows||[])
        })
    }

    //recebe o valor nome do cliente de um campo e depois realiza a busca no BD
    register_pet_nome_cliente(pet_cliente){
        let nome_cliente = pet_cliente.nome_cliente;
        let id_cliente = nome_cliente;
        let nome = pet_cliente.nome;
        let tipo = pet_cliente.tipo;
        let raca = pet_cliente.raca;
        let descricao = pet_cliente.descricao;

        if(
            (id_cliente == null || id_cliente.trim() == '')

        )
            nome_cliente = `SELECT id_cliente FROM cliente WHERE nome = $! `;
            let params1 = [
                nome_cliente
            ]
        
        let sql = `INSERT INTO pet (nome_raca, nome_pet, fk_id_cliente, descricao, tipo) VALUES ($1, $2, $3, $4, $5)`;

        let params = [
            raca,
            nome,
            id_cliente,
            descricao,
            tipo
        ];

        return this.query(sql, params).then(result => (result != null &&result.rowCount > 0))
    }
}

module.exports = UserController;