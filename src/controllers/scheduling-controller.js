const CustomError = require('../models/custom-error');
const DB = require('../models/db');

class SchedulingController extends DB{

    constructor(conn, db_type="mysql"){
        super(conn, db_type);
    }

    consultar(data, hora){
        let sql = 'SELECT a.id_agenda, p.nome_fantasia, p.rua, p.numero, p.bairro, p.cidade FROM agenda_pet_shop a INNER JOIN pet_shop p ON a.fk_id_cnpj = p.cnpj WHERE dia_mes = $1 AND horario = $2'
        let params = [data, hora];

        return this.query(sql, params).then(result => {
            return (result?.rows||[]);
        })
    }

    //use esse para gerar o agendamento
    reservar(id_cliente, id_agenda){
        let sql = 'UPDATE agenda_pet_shop SET fk_id_cliente = $1 WHERE id_agenda = $2';
        let params = [id_cliente, id_agenda];

        return this.query(sql, params).then(result => {
            return (result != null &&result.rowCount > 0)
        });
    }
    //essa consulta gera a lista de horas disponiveis
    consultar_hora(data){
        let sql = 'SELECT DISTINCT horario FROM agenda_pet_shop WHERE dia_mes = $1 AND fk_id_cliente IS null ORDER BY horario;';
        let params = [data];

        return this.query(sql, params).then(result => {
            return (result?.rows||[]);
        })
    }

    
}

module.exports = SchedulingController;