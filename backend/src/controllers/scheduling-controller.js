const CustomError = require('../models/custom-error');
const DB = require('../models/db');

class SchedulingController extends DB{

    constructor(){
        super(conn);
    }

    consultar(data, hora){
        let sql = 'SELECT * FROM v_disponivel WHERE data = ? AND hora = ?'
        let params = [data, hora]

        console.log(data, hora)

        return this.query(sql, params).then(rows => {
            console.log(rows)
            return (rows.length > 0);
        })
    }

    
}

module.exports = SchedulingController;