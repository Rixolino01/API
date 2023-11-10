const CustomError = require('../models/custom-error');
const DB = require('../models/db');

class SchedulingController extends DB{

    constructor(conn, db_type="mysql"){
        super(conn, db_type);
    }

    consultar(data, hora){
        let sql = 'SELECT * FROM v_disponivel WHERE dia_mes = $1 AND horario = $2'
        let params = [data, hora];

        return this.query(sql, params).then(result => {
            return ((result?.rows||[]).length > 0);
        })
    }

    reservar(id_cliente, id_agenda){
        let sql = 'UPDATE agenda_pet_shop SET fk_id_cliente = $1 WHERE id_agenda = $2';
        let params = [id_cliente, id_agenda];

        return this.query(sql, params).then(result => {
            return (result != null &&result.rowCount > 0)
        });
    }
    consultar_hora(data){
        let sql = 'SELECT DISTINCT horario FROM v_disponivel WHERE dia_mes = $1 ORDER BY horario';
        let params = [data];

        return this.query(sql, params).then(result => {
            return ((result?.rows||[]).length > 0);
        })
    }

    
}

module.exports = SchedulingController;