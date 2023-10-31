const CustomError = require('../models/custom-error');
const DB = require('../models/db');
const sha256 = require('sha256');

class UserController extends DB{

    constructor(conn){
        super(conn);
    }

    login(email, senha){
        let sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
        let params = [email, sha256(senha)];
        
        return this.query(sql, params).then(rows => {
            console.log(rows)
            return (rows.length > 0);
        })
    }

    register(user){
        
        let nome = user.nome;
        let email = user.email;
        let senha = user.senha;
        let telefone = user.telefone;
        let bairro = user.bairro;
        let cidade = user.cidade;
        let logradouro = user.logradouro;
        let cep = user.cep;

        if(
            (nome == null || nome.trim() == '') ||
            (email == null || email.trim() == '') ||
            (senha == null || senha.trim() == '') ||
            (telefone == null || telefone.trim() == '')
        )
            throw new CustomError('Verifique os campos obrigatórios!', 400);

        let sql = `
            INSERT INTO usuarios (nome, email, senha, telefone, bairro, cidade, logradouro, cep) VALUES (?,?,?,?,?,?,?,?)
        `;
        let params = [
            nome,
            email,
            sha256(senha),
            telefone,
            bairro,
            cidade,
            logradouro,
            cep
        ];

        return this.query(sql, params).then(result => result != null)

    }
}

module.exports = UserController;