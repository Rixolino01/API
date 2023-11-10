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
            return ((result?.rows||[]).length > 0);
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
}

module.exports = UserController;