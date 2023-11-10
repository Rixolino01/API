const DB = require('../models/db');

class ProductController extends DB{

    constructor(conn, db_type="mysql"){
        super(conn, db_type);
    }

    
}

module.exports = ProductController;