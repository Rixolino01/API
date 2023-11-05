const CustomError = require('../models/custom-error');
const DB = require('../models/db');

class SchedulingController extends DB{

    constructor(conn){
        super(conn);
    }

    consultar(data, hora){
        let sql = 'SELECT * FROM v_disponivel WHERE dia_mes = ? AND horario = ?'
        let params = [data, hora]

        console.log(data, hora)

        return this.query(sql, params).then(rows => {
            console.log(rows)
            return (rows.length > 0);
        })
    }

    reservar(id_cliente, id_agenda){
        let sql = 'UPDATE agenda_pet_shop SET fk_id_cliente = ? WHERE id_agenda = ?'
        let params = [id_cliente, id_agenda]

        return this.query(sql, params).then(rows => {
            console.log(rows)
            return (rows.length > 0)
        })
    }
    consultar_data(data){
        let sql = 'SELECT * FROM v_disponivel WHERE dia_mes = ?'
        let params = [data]

        console.log(data,)

        return this.query(sql, params).then(rows => {
            console.log(rows)
            return (rows.length > 0);
        })
    }

    
}

module.exports = SchedulingController;